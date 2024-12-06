import z from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { deleteGoal } from '../functions/delete-goal'

export const deleteGoalRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/delete-goal',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body

      await deleteGoal({
        goalId,
      })
    }
  )
}
