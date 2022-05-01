import * as trpcNext from "@trpc/server/adapters/next";
import { withAuth } from "@clerk/nextjs/api";

import { appRouter } from "@/server/router";
import { createContext } from "@/server/utils/context";

// export API handler
export default withAuth(
  trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
  })
);
