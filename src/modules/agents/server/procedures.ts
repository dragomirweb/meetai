import { db } from '@/db'
import { agents } from '@/db/schema'
import { baseProcedure, createTRPCRouter } from '@/trpc/init'

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    return db.select().from(agents)
  }),
})
