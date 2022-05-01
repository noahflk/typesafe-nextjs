import { createRouter } from "@/server/utils/createRouter";

import { prisma } from "@/db/client";
import { z } from "zod";

export const todoRouter = createRouter()
  .query("get-all", {
    async resolve({ ctx }) {
      return await prisma.todo.findMany({
        where: { userId: ctx.auth?.userId },
      });
    },
  })
  .mutation("create", {
    input: z.object({ name: z.string() }),
    async resolve({ input, ctx }) {
      return await prisma.todo.create({ data: { name: input.name, userId: ctx.auth?.userId ?? "" } });
    },
  })
  .mutation("set-status", {
    input: z.object({ id: z.number(), done: z.boolean() }),
    async resolve({ input, ctx }) {
      const todo = await prisma.todo.findFirst({ where: { id: input.id, userId: ctx.auth?.userId ?? "" } });

      if (!todo) {
        throw new Error("Todo not found");
      }

      return await prisma.todo.update({
        where: { id: input.id },
        data: { done: input.done },
      });
    },
  })
  .mutation("delete", {
    input: z.object({ id: z.number() }),
    async resolve({ input, ctx }) {
      const todo = await prisma.todo.findFirst({ where: { id: input.id, userId: ctx.auth?.userId ?? "" } });

      if (!todo) {
        throw new Error("Todo not found");
      }

      return await prisma.todo.delete({ where: { id: input.id } });
    },
  });
