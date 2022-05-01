import { useAuth } from "@clerk/nextjs";
import type { NextPage } from "next";

import { AddTodo } from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";

const Home: NextPage = () => {
  const { signOut } = useAuth();

  return (
    <div className="bg-gray-900 h-screen w-full p-4 text-gray-200">
      <div className="w-full flex justify-end  p-2">
        <button className="font-medium" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
      <div className="flex flex-col items-center gap-y-8 pt-8">
        <h1 className="text-4xl font-medium">Get stuff done</h1>
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
