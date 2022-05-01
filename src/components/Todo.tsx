import { Todo as TodoModel } from "@prisma/client";

import { trpc } from "@/utils/trpc";
import { TrashIcon } from "@/components/Icons";

export const Todo: React.FC<{ todo: TodoModel }> = ({ todo }) => {
  const client = trpc.useContext();

  const setTodoStatus = trpc.useMutation("todos.set-status", {
    onMutate: async (newTodo) => {
      await client.cancelQuery(["todos.get-all"]);
      const previousTodos = client.getQueryData(["todos.get-all"]);

      client.setQueryData(["todos.get-all"], (old) => {
        if (!old) return [];

        return old.map((todo) => {
          if (todo.id === newTodo.id) {
            return { ...todo, done: newTodo.done };
          }

          return todo;
        });
      });

      return { previousTodos };
    },
    onError: (error, newTodo, context: any) => {
      client.setQueryData(["todos.get-all"], context.previousTodos);
    },
    onSettled: () => {
      client.invalidateQueries("todos.get-all");
    },
  });

  const deleteTodo = trpc.useMutation("todos.delete", {
    onMutate: async (deletedTodo) => {
      await client.cancelQuery(["todos.get-all"]);
      const previousTodos = client.getQueryData(["todos.get-all"]);

      client.setQueryData(["todos.get-all"], (old) => {
        if (!old) return [];

        return old.filter((todo) => {
          if (todo.id === deletedTodo.id) return false;

          return true;
        });
      });

      return { previousTodos };
    },
    onError: (error, newTodo, context: any) => {
      client.setQueryData(["todos.get-all"], context.previousTodos);
    },
    onSettled: () => {
      client.invalidateQueries("todos.get-all");
    },
  });

  return (
    <li className="w-full bg-gray-800 flex rounded-lg justify-between  gap-x-4 py-3 p-4">
      <div className="flex items-center gap-x-4 truncate">
        <input
          id="offers"
          aria-describedby="offers-description"
          name="offers"
          type="checkbox"
          checked={todo.done}
          onChange={() => setTodoStatus.mutate({ id: todo.id, done: !todo.done })}
          className="h-6 w-6 bg-transparent cursor-pointer focus:border-fuchsia-500 text-fuchsia-600 border-fuchsia-600 border-2 rounded-full"
        />
        <p className="truncate">{todo.name}</p>
      </div>
      <button onClick={() => deleteTodo.mutate({ id: todo.id })}>
        <TrashIcon />
      </button>
    </li>
  );
};
