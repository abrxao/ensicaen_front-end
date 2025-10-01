import { createContext, useReducer, useContext } from "react";
import {
  initialState,
  todoReducer,
  TODO_ACTIONS,
} from "/src/reducers/TodoReducer";

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
  // Action creators avec mise à jour optimiste
  const actions = {
    setTodos: (todos) => {
      dispatch({
        type: TODO_ACTIONS.SET_TODOS,
        payload: todos,
      });
    },
    addTodo: (text) => {
      dispatch({
        type: TODO_ACTIONS.ADD,
        payload: {
          id: Date.now(),
          text,
          isEditing: false,
          completed: false,
        },
      });
    },
    deleteTodo: (todo) =>
      dispatch({
        type: TODO_ACTIONS.DELETE,
        payload: { id: todo.id },
      }),
    updateTodo: (update) => {
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
    toggleTodo: (todo) => {
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

/* import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  TODO_ACTIONS,
  todoReducer,
  initialState as todoInitialState,
} from "../reducers/TodoReducer";

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within TodoProvider");
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, todoInitialState);

  // Action creators avec mise à jour optimiste
  const actions = {
    addTodo: (text) => {
      dispatch({
        type: TODO_ACTIONS.ADD,
        payload: {
          id: Date.now(),
          text,
          isEditing: false,
          completed: false,
        },
        updateTodo: (updateText) => {
          dispatch({
            type: TODO_ACTIONS.UPDATE,
            payload: {
              id: Date.now(),
              updateText,
              isEditing: false,
              completed: true,
            },
          });
        },
      });
    },

    // TODO: Ajoutez les autres méthodes pour les actions définies dans le reducer
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
 */
