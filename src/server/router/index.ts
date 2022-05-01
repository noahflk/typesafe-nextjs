import * as trpc from "@trpc/server";
import superjson from "superjson";

import { todoRouter } from "@/server/router/todos";
import { Context } from "@/server/utils/context";
import { createRouter } from "@/server/utils/createRouter";

export const appRouter = createRouter().transformer(superjson).merge("todos.", todoRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
