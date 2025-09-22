import { useContext, useState } from "react";
import { TodoContext } from "../../contexts/TodoContext";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  // TODO -
  // Integrate context
  const { todoState, setTodoState } = useContext(TodoContext);
  return (
    <div className="todo-list">
      {todoState.todos.map((_, index) => (
        <TodoItem key={index} id={index} />
      ))}
    </div>
  );
}
