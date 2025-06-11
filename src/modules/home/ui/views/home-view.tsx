'use client'

import { useQuery } from '@tanstack/react-query'

import { useTRPC } from '@/trpc/client'

export const HomeView = () => {
  const trpc = useTRPC()
  const { data } = useQuery(
    trpc.hello.queryOptions({ text: 'Michael' })
  )

  return <div>{data?.greeting}</div>
}
