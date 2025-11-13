import { useState } from "react";
import useTodoContext from "src/hooks/useTodoContext";

export function useTodoItem(todo) {
  const { actions } = useTodoContext();
  const [text, setText] = useState(todo.text);
  const [isLoading, setIsLoading] = useState(false);

  function resetEdition() {
    setText(todo.text);
    actions.cancelEdit({ ...todo });
  }

  async function withLoading(asyncFn) {
    try {
      setIsLoading(true);
      await asyncFn();
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave(event) {
    event?.preventDefault?.();

    const trimmed = text.trim();

    if (trimmed === "") {
      resetEdition();
      return;
    }

    if (trimmed === todo.text) {
      actions.cancelEdit({ ...todo });
      return;
    }

    await withLoading(() => {
      actions.updateTodo({
        ...todo,
        text: trimmed,
        isEditing: false,
      });
    });
  }

  async function handleKeyDown(event) {
    if (event.key === "Escape") {
      resetEdition();
      return;
    }

    if (event.key === "Enter") {
      await handleSave(event);
    }
  }

  function handleChange(event) {
    event.preventDefault();
    setText(event.target.value);
  }

  async function handleDelete() {
    await withLoading(() => actions.deleteTodo({ ...todo }));
  }

  async function handleToggleTodo() {
    await withLoading(() => actions.toggleTodo({ ...todo }));
  }

  async function handleUnarchive() {
    await withLoading(() => actions.unarchiveTodo({ ...todo }));
  }

  function startEdit() {
    actions.startEdit({ ...todo });
  }

  return {
    text,
    isLoading,
    handleKeyDown,
    handleChange,
    handleSave,
    handleDelete,
    handleToggleTodo,
    handleUnarchive,
    startEdit,
  };
}
