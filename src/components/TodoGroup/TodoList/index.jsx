import { TodoItem } from "src/components/TodoGroup/TodoItem";
import EmptyTodoList from "./EmptyTodoList";
import { useTodoContext } from "src/contexts/TodoContext";

export function TodoList() {
  const { selectors } = useTodoContext();
  return (
    <div className="todo-list">
      {selectors.getTodos().map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {!selectors.getTodos().length && <EmptyTodoList />}
    </div>
  );
}
