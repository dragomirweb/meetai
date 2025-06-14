'use client'

import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { DataTable } from '@/components/data-table'
import { EmptyState } from '@/components/empty-state'
import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'

import { useAgentFilters } from '@/modules/agents/hooks/use-agent-filters'
import { columns } from '@/modules/agents/ui/components/columns'
import { DataPagination } from '@/modules/agents/ui/components/data-pagination'
import { useTRPC } from '@/trpc/client'

export const AgentsView = () => {
  const router = useRouter()
  const [filters, setFilters] = useAgentFilters()
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  )

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
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
