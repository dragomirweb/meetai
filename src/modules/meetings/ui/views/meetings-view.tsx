'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'

import { useTRPC } from '@/trpc/client'

export const MeetingsView = () => {
  const trpc = useTRPC()

  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

  return <div>data table</div>
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
