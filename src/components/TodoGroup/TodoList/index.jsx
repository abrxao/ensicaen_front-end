import { useTodoContext } from "src/contexts/TodoContext";
import { TodoItem } from "src/components/TodoGroup/TodoItem";
import EmptyTodoList from "./EmptyTodoList";

export function TodoList() {
  const { selectors } = useTodoContext();
  return (
    <div className="todo-list">
      {selectors.getTodos().map((todo, _) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {!selectors.getTodos().length && <EmptyTodoList />}
    </div>
  );
}
