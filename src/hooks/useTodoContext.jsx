import { createContext, useContext } from "react";
import { initialState } from "src/reducers/TodoReducer";

export const TodoContext = createContext(initialState);

export default function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within TodoProvider");
  }
  return context;
}
