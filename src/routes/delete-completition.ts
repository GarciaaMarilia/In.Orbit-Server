import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { ClientError } from "../errors/client-error";
import { deleteCompletition } from "../functions/delete-completition";

export const deleteCompletitionRoute: FastifyPluginAsyncZod = async (app) => {
 app.delete(
  "/delete-completition/:completitionId",
  {
   schema: {
    params: z.object({
     completitionId: z.string(),
    }),
   },
  },

  async (request, reply) => {
   const { completitionId } = request.params;

   try {
    const deletedCompletition = await deleteCompletition({
     completitionId,
    });

    if (!deletedCompletition) {
     throw new ClientError("Completition not found");
    }
    reply.status(200).send({ message: "Completition deleted successfully" });
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
