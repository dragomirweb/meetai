import { inferRouterOutputs } from '@trpc/server'

import type { AppRouter } from '@/trpc/routers/_app'

export type Meeting = inferRouterOutputs<AppRouter>['meetings']['getOne']
export type Meetings =
  inferRouterOutputs<AppRouter>['meetings']['getMany']['items']
