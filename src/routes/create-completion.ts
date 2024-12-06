import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { ClientError } from "../errors/client-error";
import { createGoalCompletion } from "../functions/create-goal-completion";

export const createCompletionRoute: FastifyPluginAsyncZod = async (app) => {
 app.post(
  "/completions",
  {
   schema: {
    body: z.object({
     goalId: z.string(),
    }),
   },
  },
  async (request, reply) => {
   const { goalId } = request.body;

   try {
    const completition = await createGoalCompletion({
     goalId,
    });
    if (!completition) {
     throw new ClientError("Completition not created.");
    }
    reply.status(200).send({ message: "Completition created successfully." });
   } catch (error) {
    if (error instanceof ClientError) {
     reply.status(400).send({ message: error.message });
    } else {
     reply.status(500).send({ message: "Internal Server Error." });
    }
   }
  }
 );
};
