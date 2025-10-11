import { useState } from "react";
import { useTodoContext } from "/src/contexts/TodoContext";
import ButtonIcon from "/src/components/ui/ButtonIcon";
import InputText from "/src/components/ui/InputText";
import { Pencil, Save, Trash } from "lucide-react";

export function TodoItem({ todo }) {
  const { actions } = useTodoContext();
  const [text, setText] = useState(todo.text ?? "");
  const [isLoading, setIsLoading] = useState(false);

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
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => actions.toggleTodo({ ...todo })}
        className="todo-checkbox"
      />
      {todo.isEditing ? (
        <InputText
          autoFocus
          onBlur={handleSave}
          defaultValue={todo.text}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="todo-edit-input"
          type="text"
        />
      ) : (
        <span
          onDoubleClick={() => actions.startEdit({ ...todo })}
          className="todo-text"
        >
          {todo.text}
        </span>
      )}

      {todo.isEditing ? (
        // This button doesn't need an onClick because the save is handled by onBlur and Enter key
        <ButtonIcon disabled={isLoading}>
          <Save size={16} />
        </ButtonIcon>
      ) : (
        <ButtonIcon onClick={() => actions.startEdit({ ...todo })}>
          <Pencil size={16} />
        </ButtonIcon>
      )}
      <ButtonIcon onClick={handleDelete} disabled={isLoading}>
        <Trash size={16} />
      </ButtonIcon>
    </div>
  );
}
