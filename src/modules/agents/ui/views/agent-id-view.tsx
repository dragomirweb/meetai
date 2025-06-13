'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { VideoIcon } from 'lucide-react'

import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { Badge } from '@/components/ui/badge'
import { GeneratedAvatar } from '@/components/ui/generated-avatar'

import { AgentIdViewHeader } from '@/modules/agents/ui/components/agent-id-view-header'
import { useTRPC } from '@/trpc/client'

interface Props {
  agentId: string
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC()

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  )

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
      <AgentIdViewHeader
        agentId={data.id}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      <div className="rounded-lg border bg-white">
        <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              className="size-10 overflow-hidden rounded-full"
              seed={data.name}
              variant="botttsNeutral"
            />
            <h2 className="text-2xl font-medium">{data.name}</h2>
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 [&>svg]:size-4"
          >
            <VideoIcon className="text-blue-700" /> {data.meetingCount}{' '}
            {data.meetingCount === 1 ? 'Meeting' : 'Meetings'}
          </Badge>
          <div className="flex flex-col gap-y-4">
            <p className="text-xl font-medium">Instructions</p>
            <p className="text-neutral-800">{data.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const AgentsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading agent"
      message="Please wait while we load the agent"
    />
  )
}

export const AgentsIdViewError = () => {
  return (
    <ErrorState title="Error loading agent" message="Something went wrong" />
  )
}
