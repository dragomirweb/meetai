'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { EmptyState } from '@/components/empty-state'
import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'

import { columns } from '@/modules/agents/ui/components/columns'
import { DataTable } from '@/modules/agents/ui/components/data-table'
import { useTRPC } from '@/trpc/client'

export const AgentsView = () => {
  const trpc = useTRPC()
  const { data: agentsList } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions()
  )

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable columns={columns} data={agentsList} />
      {agentsList.length === 0 && (
        <EmptyState
          title="Create your first agent"
          message="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call"
        />
      )}
    </div>
  )
}

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading agents"
      message="Please wait while we load the agents"
    />
  )
}

export const AgentsViewError = () => {
  return (
    <ErrorState title="Error loading agents" message="Please try again later" />
  )
}
