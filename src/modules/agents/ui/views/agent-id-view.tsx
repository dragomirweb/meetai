'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { VideoIcon } from 'lucide-react'
import { toast } from 'sonner'

import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { Badge } from '@/components/ui/badge'
import { GeneratedAvatar } from '@/components/ui/generated-avatar'

import { useConfirm } from '@/modules/agents/hooks/use-confirm'
import { AgentIdViewHeader } from '@/modules/agents/ui/components/agent-id-view-header'
import { UpdateAgentDialog } from '@/modules/agents/ui/components/update-agent'
import { useTRPC } from '@/trpc/client'

interface Props {
  agentId: string
}

export const AgentIdView = ({ agentId }: Props) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const trpc = useTRPC()

  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false)

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  )

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        )
        // TODO invalidate free tier usage
        router.push('/agents')
      },
      onError: (err) => {
        toast.error(err.message)
      },
    })
  )

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    'Are you sure?',
    `The following action will remove ${data.meetingCount} associated ${data.meetingCount === 1 ? 'meeting' : 'meetings'}`
  )

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove()
    if (!ok) return

    await removeAgent.mutateAsync({ id: agentId })
  }

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        setOpen={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
        <AgentIdViewHeader
          agentId={data.id}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />
        <div className="rounded-lg border bg-white">
          <div className="flex flex-col gap-y-5 px-4 py-5">
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
    </>
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
