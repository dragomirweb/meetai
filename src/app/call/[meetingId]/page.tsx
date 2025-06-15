import { Suspense } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

import { auth } from '@/lib/auth'
import {
  CallView,
  CallViewError,
  CallViewLoading,
} from '@/modules/call/ui/views/call-view'
import { getQueryClient, trpc } from '@/trpc/server'

interface Props {
  params: Promise<{
    meetingId: string
  }>
}

const Page = async ({ params }: Props) => {
  const { meetingId } = await params

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in')
  }

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<CallViewError />}>
        <Suspense fallback={<CallViewLoading />}>
          <CallView meetingId={meetingId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}

export default Page
