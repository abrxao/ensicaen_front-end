import { createContext, useReducer, useContext } from "react";
import {
  initialState,
  todoReducer,
  TODO_ACTIONS,
} from "src/reducers/TodoReducer";
import { useTodoAPI } from "src/hooks/useTodoAPI";

// Step 1: Create a Context
const TodoContext = createContext(initialState);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within TodoProvider");
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const {
    deleteTodo: deleteFromAPI,
    updateTodo: updateFromAPI,
    addTodo: addToAPI,
  } = useTodoAPI();

  const actions = {
    setTodos: (todos) => {
      dispatch({
        type: TODO_ACTIONS.SET_TODOS,
        payload: todos,
      });
    },
    addTodo: async (text) => {
      const todoId = Date.now();
      await addToAPI(text, todoId);
      dispatch({
        type: TODO_ACTIONS.ADD,
        payload: { id: todoId, text: text, completed: false },
      });
    },
    deleteTodo: async (todo) => {
      await deleteFromAPI(todo.id);
      dispatch({
        type: TODO_ACTIONS.DELETE,
        payload: todo,
      });
    },
    updateTodo: async (update) => {
      await updateFromAPI(update.id, { text: update.text });
      dispatch({
        type: TODO_ACTIONS.UPDATE,
        payload: { id: update.id, text: update.text },
      });
    },
    startEdit: (todo) => {
      dispatch({
        type: TODO_ACTIONS.START_EDIT,
        payload: { id: todo.id },
      });
    },
    cancelEdit: (todo) => {
      dispatch({
        type: TODO_ACTIONS.CANCEL_EDIT,
        payload: { id: todo.id },
      });
    },
    toggleTodo: async (todo) => {
      await updateFromAPI(todo.id, { completed: !todo.completed });
      dispatch({
        type: TODO_ACTIONS.TOGGLE,
        payload: { id: todo.id },
      });
    },
    setFilterTodo: (filter) => {
      dispatch({
        type: TODO_ACTIONS.SET_FILTER,
        payload: { filter: filter },
      });
    },
  };

  // Sélecteurs (computed values)
  const selectors = {
    getTodos: () => {
      switch (state.filter) {
        case "active":
          return state.todos.filter((todo) => !todo.completed);
        case "completed":
          return state.todos.filter((todo) => todo.completed);
        default:
          return state.todos;
      }
    },
  };

  const value = {
    state,
    actions,
    selectors,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
