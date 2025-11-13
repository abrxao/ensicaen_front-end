import ButtonIcon from "src/components/ui/ButtonIcon";
import InputText from "src/components/ui/InputText";
import { ArchiveRestore, Pencil, Save, Trash } from "lucide-react";
import { useLingui } from "@lingui/react/macro";

import { useTodoItem } from "./useTodoItem";
import "./TodoItem.css";

function TodoItem({ todo, archived = false }) {
  const { t } = useLingui();

  const {
    text,
    isLoading,
    handleKeyDown,
    handleChange,
    handleSave,
    handleDelete,
    handleToggleTodo,
    handleUnarchive,
    startEdit,
  } = useTodoItem(todo);

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
          onDoubleClick={startEdit}
          className="todo-text"
        >
          {todo.text}
        </span>
      )}

      <>
        {archived ? (
          <>
            <ButtonIcon
              onClick={handleUnarchive}
              disabled={isLoading}
              aria-label={t`Restaurer la tâche "${todo.text}"`}
            >
              <ArchiveRestore size={16} />
            </ButtonIcon>
          </>
        ) : (
          <>
            {todo.isEditing ? (
              // Salva via blur e tecla Enter (não precisa de onClick)
              <ButtonIcon
                disabled={isLoading}
                aria-label={t`Sauvegarder les modifications`}
              >
                <Save size={16} />
              </ButtonIcon>
            ) : (
              <ButtonIcon
                onClick={startEdit}
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

export default TodoItem;
export { TodoItem };
