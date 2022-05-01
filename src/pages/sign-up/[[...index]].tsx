import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="bg-gray-900 flex justify-center items-center h-screen w-full p-4 text-gray-200">
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
);

export default SignUpPage;
