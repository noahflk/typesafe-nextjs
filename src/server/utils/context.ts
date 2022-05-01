import * as trpc from "@trpc/server";
import { NextApiRequest, NextApiResponse } from "next";

type CloakSession = {
  auth?: {
    sessionId: string;
    userId: string;
  };
};

type ContextOptions = {
  req: NextApiRequest & CloakSession;
  res: NextApiResponse;
};

export async function createContext(opts?: ContextOptions) {
  return {
    auth: opts?.req.auth,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
