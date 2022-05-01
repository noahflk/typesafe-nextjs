import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="bg-gray-900 flex justify-center items-center h-screen w-full p-4 text-gray-200">
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
);

export default SignInPage;
