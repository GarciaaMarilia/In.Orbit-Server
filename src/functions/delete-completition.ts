import { eq } from "drizzle-orm";

import { db } from "../db";
import { goalCompletions } from "../db/schema";

interface DeleteCompletitionRequest {
 completitionId: string;
}

export async function deleteCompletition({
 completitionId,
}: DeleteCompletitionRequest) {
 const deletedCompletition = await db
  .delete(goalCompletions)
  .where(eq(goalCompletions.id, completitionId));

 if (deletedCompletition.count === 0) {
  throw new Error(`No completition found with id: ${completitionId}`);
 }

 return deletedCompletition;
}
