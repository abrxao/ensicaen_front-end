import { useTodoContext } from "/src/contexts/TodoContext";
import { TodoItem } from "/src/components/TodoList/TodoItem";
import { useTodoAPI } from "/src/hooks/useTodoAPI";

export function TodoList() {
  const { state, selectors } = useTodoContext();
  const { loading, error } = useTodoAPI();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  return (
    <div className="todo-list">
      {selectors.getTodos().map((todo, idx) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
