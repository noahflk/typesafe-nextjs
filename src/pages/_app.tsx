import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { withTRPC } from "@trpc/next";
import superjson from "superjson";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";

import { AppRouter } from "@/server/router";

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]"];

const SignedOutRedirect = () => {
  const router = useRouter();

  router.push("/sign-in");

  return null;
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ClerkProvider {...pageProps}>
      {publicPages.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>

          <SignedOut>
            <SignedOutRedirect />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
