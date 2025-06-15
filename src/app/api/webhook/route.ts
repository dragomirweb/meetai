import { NextRequest, NextResponse } from 'next/server'
import {
  CallEndedEvent,
  CallRecordingReadyEvent,
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
  CallTranscriptionReadyEvent,
} from '@stream-io/node-sdk'
import { and, eq, not } from 'drizzle-orm'

import { streamVideo } from '@/lib/stream-video'
import { db } from '@/db/index'
import { agents, meetings } from '@/db/schema'
import { inngest } from '@/inngest/client'

function verifySignatureWithSdk(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature)
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get('x-signature')
  const apiKey = request.headers.get('x-api-key')

  if (!apiKey || !signature) {
    return NextResponse.json({ error: 'Missing headers' }, { status: 400 })
  }

  const body = await request.text()

  if (!verifySignatureWithSdk(body, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let payload: unknown

  try {
    payload = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (!payload) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const eventType = (payload as Record<string, unknown>)?.type

  if (eventType === 'call.session_started') {
    const event = payload as CallSessionStartedEvent
    const meetingId = event.call.custom?.meetingId

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Meeting ID is required - call.session_started' },
        { status: 400 }
      )
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, 'completed')),
          not(eq(meetings.status, 'active')),
          not(eq(meetings.status, 'cancelled')),
          not(eq(meetings.status, 'processing'))
        )
      )

    if (!existingMeeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 })
    }

    await db
      .update(meetings)
      .set({
        status: 'active',
        startedAt: new Date(),
      })
      .where(eq(meetings.id, existingMeeting.id))

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId))

    if (!existingAgent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }

    const call = streamVideo.video.call('default', meetingId)

    const realtimeClient = await streamVideo.video
      .connectOpenAi({
        call,
        openAiApiKey: process.env.AICONF_OPENAI_API_KEY!,
        agentUserId: existingAgent.id,
      })
      .catch((err) => {
        console.error('err creating realtime ai client', err)
      })

    realtimeClient.updateSession({
      instructions: existingAgent.instructions,
    })
  } else if (eventType === 'call.session_participant_left') {
    const event = payload as CallSessionParticipantLeftEvent
    const meetingId = event.call_cid.split(':')[1]

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Meeting ID is required - session_participant_left' },
        { status: 400 }
      )
    }

    const call = streamVideo.video.call('default', meetingId)
    await call.end()
  } else if (eventType === 'call.session_ended') {
    const event = payload as CallEndedEvent
    const meetingId = event.call.custom?.meetingId

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Meeting ID is required - call.session_ended' },
        { status: 400 }
      )
    }

    await db
      .update(meetings)
      .set({
        status: 'processing',
        endedAt: new Date(),
      })
      .where(and(eq(meetings.id, meetingId), eq(meetings.status, 'active')))
  } else if (eventType === 'call.transcription_ready') {
    const event = payload as CallTranscriptionReadyEvent
    const meetingId = event.call_cid.split(':')[1]

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Meeting ID is required - transcription_ready' },
        { status: 400 }
      )
    }

    const [updatedMeeting] = await db
      .update(meetings)
      .set({
        transcriptUrl: event.call_transcription.url,
      })
      .where(and(eq(meetings.id, meetingId)))
      .returning()

    inngest.send({
      name: 'meetings/processing',
      data: {
        meetingId: updatedMeeting.id,
        transcriptUrl: event.call_transcription.url,
      },
    })

    if (!updatedMeeting) {
      return NextResponse.json(
        { error: 'Meeting not found - transcription_ready' },
        { status: 404 }
      )
    }
  } else if (eventType === 'call.recording_ready') {
    const event = payload as CallRecordingReadyEvent
    const meetingId = event.call_cid.split(':')[1]

    if (!meetingId) {
      return NextResponse.json(
        { error: 'Meeting ID is required - transcription_ready' },
        { status: 400 }
      )
    }

    await db
      .update(meetings)
      .set({
        recordingUrl: event.call_recording.url,
      })
      .where(and(eq(meetings.id, meetingId)))
  }

  return NextResponse.json({ message: 'ok' }, { status: 200 })
}
