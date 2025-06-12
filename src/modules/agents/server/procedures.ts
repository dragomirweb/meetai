import { eq } from 'drizzle-orm'
import z from 'zod'

import { db } from '@/db'
import { agents } from '@/db/schema'
import { createTRPCRouter, protectedProcedure } from '@/trpc/init'

import { agentsInsertSchema } from '../schemas'

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [agent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id))

      return agent
    }),
  getMany: protectedProcedure.query(async () => {
    return db.select().from(agents)
  }),
  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning()

      return createdAgent
    }),
})
