import { useState, useEffect } from "react";

const BASE_URL = "https://dummyjson.com";
export const USER_ID = 1;

export const useTodoAPI = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer tous les todos
  const fetchTodos = async (limit = 10) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/todos?limit=${limit}`);

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      const adaptedTodos = data.todos.map((todo) => ({
        id: todo.id,
        text: todo.todo,
        completed: todo.completed,
        isEditing: false,
        userId: todo.userId,
      }));
      setTodos(adaptedTodos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const addTodo = async (todoText) => {
    try {
      const response = await fetch(`${BASE_URL}/todos/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: todoText,
          completed: false,
          userId: USER_ID,
        }),
      });
      const newTodo = await response.json();
      setTodos((prevTodos) => [
        {
          id: newTodo.id,
          text: newTodo.todo,
          completed: newTodo.completed,
        },
        ...prevTodos,
      ]);
    } catch (err) {
      setError("Impossible d'ajouter la tâche.");
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updates } : todo
        )
      );
    } catch (err) {
      setError("Impossible de mettre à jour la tâche.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });

      console.log(await response.json());
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Impossible de supprimer la tâche.");
    }
  };
  useEffect(() => {
    fetchTodos(10);
  }, []);
  return { todos, loading, error, fetchTodos, addTodo, updateTodo, deleteTodo };
  // TODO : Ajoutez les autres fonctions d'appels à l'API (voir la doc de l’API)
};
