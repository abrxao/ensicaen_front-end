import { useTodoContext } from "/src/contexts/TodoContext";
import { TodoItem } from "/src/components/TodoList/TodoItem";

export function TodoList() {
  const {
    state: { todos },
  } = useTodoContext();
  return (
    <div className="todo-list">
      {todos.map((todo, idx) => (
        <TodoItem key={todo.id} id={idx} />
      ))}
    </div>
  );
}
