'use client'

import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { DataPagination } from '@/components/data-pagination'
import { DataTable } from '@/components/data-table'
import { EmptyState } from '@/components/empty-state'
import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'

import { useTRPC } from '@/trpc/client'

import { useMeetingsFilters } from '../../hooks/use-meetings-filters'
import { columns } from '../components/columns'

export const MeetingsView = () => {
  const trpc = useTRPC()
  const [filters, setFilters] = useMeetingsFilters()
  const router = useRouter()

  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  )

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          message="Schedule a meeting to connect woth other. Each meeting lets you collavorate, 
           share ideas, and interact with participants in real time."
        />
      )}
    </div>
  )
}

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading meetings"
      message="Please wait while we load the meetings"
    />
  )
}

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error loading meetings"
      message="Please try again later"
    />
  )
}
