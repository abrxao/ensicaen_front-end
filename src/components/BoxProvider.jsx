import { useContext } from "react";
import { TodoContext } from "/src/contexts/TodoContext";

export function BoxProvider() {
  const { todoState } = useContext(TodoContext);

  return <h3>{todoState.todos[0].text}</h3>;
}
