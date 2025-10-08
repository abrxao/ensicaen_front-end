export const TODO_ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE",
  START_EDIT: "START_EDIT",
  CANCEL_EDIT: "CANCEL_EDIT",
  SET_TODOS: "SET_TODOS",
  SET_FILTER: "SET_FILTER",
};

export const initialState = {
  todos: [],
  filter: "all", // all, active, completed
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_ACTIONS.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case TODO_ACTIONS.ADD:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case TODO_ACTIONS.UPDATE:
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      return {
        ...state,
        todos: updatedTodos,
      };
    case TODO_ACTIONS.DELETE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case TODO_ACTIONS.TOGGLE:
      const toggledTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      return {
        ...state,
        todos: toggledTodos,
      };
    case TODO_ACTIONS.START_EDIT:
      const startEditTodos = state.todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, isEditing: true } : todo
      );
      return {
        ...state,
        todos: startEditTodos,
      };
    case TODO_ACTIONS.CANCEL_EDIT:
      const cancelEditTodos = state.todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, isEditing: false } : todo
      );
      return {
        ...state,
        todos: cancelEditTodos,
      };
    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
      };

    // TODO: Implémentez les autres actions
  }
};
