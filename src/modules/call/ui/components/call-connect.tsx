'use client'

import { useEffect, useState } from 'react'
import {
  Call,
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk'
import { useMutation } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'

import { useTRPC } from '@/trpc/client'

import { CallUI } from './call-ui'

import '@stream-io/video-react-sdk/dist/css/styles.css'

interface Props {
  meetingId: string
  meetingName: string
  userId: string
  userName: string
  userImage: string
}

export const CallConnect = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: Props) => {
  const trpc = useTRPC()
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions()
  )

  const [client, setClient] = useState<StreamVideoClient>()

  useEffect(() => {
    const _client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateToken,
    })

    setClient(_client)

    return () => {
      _client.disconnectUser()
      setClient(undefined)
    }
  }, [generateToken, userId, userName, userImage])

  const [call, setCall] = useState<Call>()

  useEffect(() => {
    if (!client) return

    const _call = client.call('default', meetingId)
    _call?.camera.disable()
    _call?.microphone.disable()
    setCall(_call)

    return () => {
      if (_call.state.callingState !== CallingState.LEFT) {
        _call.leave()
        _call.endCall()
        setCall(undefined)
      }
    }
  }, [client, meetingId])

  if (!client || !call)
    return (
      <div className="from-sidebar-accent to-sidebar flex flex-grow items-center justify-center bg-radial">
        <Loader2Icon className="size-6 animate-spin text-white" />
      </div>
    )

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  )
}
