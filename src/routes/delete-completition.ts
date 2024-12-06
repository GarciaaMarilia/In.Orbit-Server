import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { deleteCompletition } from "../functions/delete-completition";
import z from "zod";

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
    await deleteCompletition({
     completitionId,
    });
    reply.status(200).send({ message: "Completition deleted successfully" });
   } catch (error) {
    return error;
   }
  }
 );
};
