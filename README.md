# typesafe-nextjs - Next.js, TypeScript, Prisma, tRPC and Clerk

## Motivation

I beleive that this tech stack offers some of the best developer experience and execution speed.

## Technology stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [tRPC](https://trpc.io/)
- [Clerk](https://clerk.dev/)
- [Tailwind](https://tailwindcss.com/)

**Hosting**

- [Vercel](https://vercel.com)
- [PlanetScale](https://planetscale.com/)

## Getting Started

### Prerequisites

- Local MySQL database or PlanetScale with local tunneling
- Node/NPM

### Setup

After cloning the repository, install the dependencies.

```bash
npm install
```

Set up the local environment variables with your MySQL connection string and Clerk.dev tokens.

```bash
touch .env

# Enter content
DATABASE_URL=
NEXT_PUBLIC_CLERK_FRONTEND_API=
CLERK_API_KEY=
CLERK_JWT_KEY=
```

Initialize the database via Prisma

```bash
npx prisma migrate dev
```

Start the development server

```bash
npm run dev
```

## Need more tools?

These are some of the libraries I often go for when projects get a little more complex.

- [Zustand](https://github.com/pmndrs/zustand)
  - React Query (integrated into tRPC) wil get you very far when dealing with server state. You will find that this along with simple `useState` hooks is often enough. However, for those cases when you need to share client state across across the whole application, Zustand is great. It's way simpler than Redux.
- [React Hook Form](https://react-hook-form.com/)
  - Now, I don't need a form library too often. But when I do, I always resort to React Hook Form. It makes dealing with complex form validations surprisingly pleasant.

## License

`typesafe-nextjs` is available under the MIT license. See the [LICENSE](LICENSE) file for more info.
