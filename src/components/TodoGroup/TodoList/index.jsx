import { useTodoContext } from "/src/contexts/TodoContext";
import { TodoItem } from "/src/components/TodoGroup/TodoItem";
import { useTodoAPI } from "/src/hooks/useTodoAPI";
import TodoListSkeleton from "./skeleton";
import EmptyTodoList from "./EmptyTodoList";

export function TodoList() {
  const { selectors } = useTodoContext();
  const { loading, error } = useTodoAPI();

  if (loading) {
    return (
      <div className="todo-list">
        <TodoListSkeleton />
      </div>
    );
  }
  if (error) {
    return <div>Error...</div>;
  }
  return (
    <div className="todo-list">
      {selectors.getTodos().map((todo, _) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {!selectors.getTodos().length && <EmptyTodoList />}
    </div>
  );
}
