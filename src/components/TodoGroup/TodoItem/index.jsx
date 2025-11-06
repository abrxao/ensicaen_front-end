import { useState } from "react";
import { useTodoContext } from "src/contexts/TodoContext";
import ButtonIcon from "src/components/ui/ButtonIcon";
import InputText from "src/components/ui/InputText";
import { ArchiveRestore, Pencil, Save, Trash } from "lucide-react";
import { useLingui } from "@lingui/react/macro";

export function TodoItem({ todo, archived = false }) {
  const { actions } = useTodoContext();
  const [text, setText] = useState(todo.text);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLingui();

  async function handleKeyDown(event) {
    if (event.key === "Escape") {
      setText(todo.text);
      actions.cancelEdit({ ...todo });
      return;
    }
    if (text === todo.text && event.key === "Enter") {
      actions.cancelEdit({ ...todo });
      return;
    }
    if (event.key === "Enter" && text.trim() !== "") {
      setIsLoading(true);
      await actions.updateTodo({
        ...todo,
        text: text,
        isEditing: false,
      });
      setIsLoading(false);
    }
  }
  async function handleDelete() {
    setIsLoading(true);
    await actions.deleteTodo({ ...todo });
    setIsLoading(false);
  }
  async function handleToggleTodo() {
    setIsLoading(true);
    await actions.toggleTodo({ ...todo });
    setIsLoading(false);
  }
  async function handleUnarchive() {
    setIsLoading(true);
    await actions.unarchiveTodo({ ...todo });
    setIsLoading(false);
  }
  function handleChange(event) {
    event.preventDefault();
    setText(event.target.value);
  }

  async function handleSave(event) {
    event.preventDefault();
    if (text.trim() === "") return;
    if (text === todo.text) {
      actions.cancelEdit({ ...todo });
      return;
    }
    setIsLoading(true);
    await actions.updateTodo({
      ...todo,
      text: text,
      isEditing: false,
    });
    setIsLoading(false);
  }
  return (
    <div className="todo-item" data-completed={todo.completed}>
      {!archived && (
        <input
          disabled={isLoading}
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleTodo}
          className="todo-checkbox"
          aria-label={t`Marquer la tâche "${todo.text}" comme complétée`}
        />
      )}
      {todo.isEditing && !archived ? (
        <InputText
          autoFocus
          onBlur={handleSave}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="todo-edit-input"
          type="text"
          aria-label={t`Modifier le texte de la tâche`}
        />
      ) : (
        <span
          onDoubleClick={() => actions.startEdit({ ...todo })}
          className="todo-text"
        >
          {todo.text}
        </span>
      )}
      <>
        {archived ? (
          <ButtonIcon
            onClick={handleUnarchive}
            disabled={isLoading}
            aria-label={t`Désarchiver la tâche "${todo.text}"`}
          >
            <ArchiveRestore size={16} />
          </ButtonIcon>
        ) : (
          <>
            {todo.isEditing ? (
              // This button doesn't need an onClick because the save is handled by onBlur and Enter key
              <ButtonIcon
                disabled={isLoading}
                aria-label={t`Sauvegarder les modifications`}
              >
                <Save size={16} />
              </ButtonIcon>
            ) : (
              <ButtonIcon
                onClick={() => actions.startEdit({ ...todo })}
                aria-label={t`Modifier la tâche "${todo.text}"`}
              >
                <Pencil size={16} />
              </ButtonIcon>
            )}

            <ButtonIcon
              onClick={handleDelete}
              disabled={isLoading}
              aria-label={t`Supprimer la tâche "${todo.text}"`}
            >
              <Trash size={16} />
            </ButtonIcon>
          </>
        )}
      </>
    </div>
  );
}
