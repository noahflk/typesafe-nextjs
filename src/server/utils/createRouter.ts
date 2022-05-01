import * as trpc from "@trpc/server";

import { Context } from "@/server/utils/context";

export function createRouter() {
  return trpc.router<Context>();
}
