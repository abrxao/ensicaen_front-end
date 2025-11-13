import { useState } from "react";
import { toast } from "react-hot-toast";
import { useLingui } from "@lingui/react/macro";
import { useTodoContext } from "src/contexts/TodoContext";
const BASE_URL = "https://dummyjson.com";
export const USER_ID = 1;

export const useTodoAPI = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { actions } = useTodoContext();
  const { t } = useLingui();
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
      actions.setTodos(adaptedTodos);
    } catch (error) {
      setError(error.message);
    } finally {
      setTimeout(() => setLoading(false), 1000); // time for loading animation be completed
    }
  };
  const addTodo = async (todoText, todoId, archived) => {
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
      // Setting states in todos api
      setTodos((prevTodos) => [
        {
          id: todoId,
          text: newTodo.todo,
          completed: newTodo.completed,
        },
        ...prevTodos,
      ]);
      toast.success(
        archived
          ? t`Tâche désarchivée avec succès !`
          : t`Tâche ajoutée avec succès !`,
        {
          duration: 3500 /* 3.5s of popup duration */,
        },
      );
    } catch (error) {
      setError("Impossible d'ajouter la tâche.");
      console.error(error);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updates } : todo,
        ),
      );
      toast.success(t`Tâche mise à jour avec succès !`, {
        duration: 3500 /* 3.5s of popup duration */,
      });
    } catch (error) {
      setError("Impossible de mettre à jour la tâche.");
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      toast.success(t`Tâche supprimée avec succès !`, {
        duration: 3500 /* 3.5s of popup duration */,
      });
    } catch (error) {
      setError("Impossible de supprimer la tâche.");
      console.error(error);
    }
  };

  return { todos, loading, error, fetchTodos, addTodo, updateTodo, deleteTodo };
  // TODO : Ajoutez les autres fonctions d'appels à l'API (voir la doc de l’API)
};
