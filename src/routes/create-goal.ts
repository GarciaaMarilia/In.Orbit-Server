import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { ClientError } from "../errors/client-error";
import { createGoal } from "../functions/create-goal";

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
 app.post(
  "/goals",
  {
   schema: {
    body: z.object({
     title: z.string(),
     desiredWeeklyFrequency: z.number().min(1).max(7),
    }),
   },
  },
  async (request, reply) => {
   // essa rota vai fornecer a conexao para a funçao createGoal criar um goal no banco de dados
   try {
    const { title, desiredWeeklyFrequency } = request.body;

    const createdGoal = await createGoal({
     title: title,
     desiredWeeklyFrequency: desiredWeeklyFrequency,
    });

    if (!createdGoal) {
     throw new ClientError("Goal not created;");
    }
    reply.status(200).send({ message: "Goal created successfully." });
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
