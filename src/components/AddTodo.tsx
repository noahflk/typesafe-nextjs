import { trpc } from "@/utils/trpc";
import { Todo } from "@prisma/client";
import { useState } from "react";

export const AddTodo: React.FC = () => {
  const [value, setValue] = useState("");
  const client = trpc.useContext();

  const { mutate } = trpc.useMutation("todos.create", {
    onMutate: async ({ name }) => {
      await client.cancelQuery(["todos.get-all"]);
      const previousTodos = client.getQueryData(["todos.get-all"]);

      client.setQueryData(["todos.get-all"], (old) => [...(old ?? []), { name, done: false, id: 9999 } as Todo]);
      setValue("");

      return { previousTodos };
    },
    onError: (error, newTodo, context: any) => {
      setValue(newTodo.name);
      client.setQueryData(["todos.get-all"], context.previousTodos);
    },
    onSettled: () => {
      client.invalidateQueries("todos.get-all");
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (value !== "") {
          mutate({ name: value });
        }
      }}
      className="space-x-4 max-w-lg flex w-full "
    >
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        type="text"
        className="focus:ring-fuchsia-500 focus:border-fuchsia-500 flex-1 py-3 px-4 border-fuchsia-600 border-2 rounded-lg bg-transparent"
        placeholder="Add a todo"
      />
      <button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-500 h-full p-4 rounded-lg font-semibold">
        Add
      </button>
    </form>
  );
};
