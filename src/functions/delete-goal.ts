import { eq } from 'drizzle-orm'

import { db } from '../db'
import { goals, goalCompletions } from '../db/schema'

interface DeleteGoalRequest {
  goalId: string
}

export async function deleteGoal({ goalId }: DeleteGoalRequest) {
  // Primeiro, delete as referências na tabela goal_completions
  await db.delete(goalCompletions).where(eq(goalCompletions.goalId, goalId))

  // Agora, delete a meta da tabela goals
  const deletedGoal = await db
    .delete(goals)
    .where(eq(goals.id, goalId))
    .returning()

  return deletedGoal
}
