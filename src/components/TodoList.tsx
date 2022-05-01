import { trpc } from "@/utils/trpc";
import { Todo } from "@/components/Todo";

export const TodoList: React.FC = () => {
  const { data: todos } = trpc.useQuery(["todos.get-all"]);

  if (!todos) return <p>Loading...</p>;

  return (
    <ul className="max-w-lg space-y-4 w-full">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
