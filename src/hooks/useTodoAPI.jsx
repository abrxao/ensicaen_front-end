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
      // Adapter les données de l'API au format local
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

  useEffect(() => {
    fetchTodos(10);
  }, []);
  return { todos, loading, error, fetchTodos };
  // TODO : Ajoutez les autres fonctions d'appels à l'API (voir la doc de l’API)
};
