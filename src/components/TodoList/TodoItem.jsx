import { useState } from "react";
import { useTodoContext } from "/src/contexts/TodoContext";
import "./TodoItem.css";
import { Pencil, Save, Trash } from "lucide-react";
import ButtonIcon from "/src/components/ui/ButtonIcon";

export function TodoItem({ todo }) {
  const { actions } = useTodoContext();
  const [text, setText] = useState(todo.text);

  function handleKeyDown(event) {
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
      actions.updateTodo({
        ...todo,
        text: text,
        isEditing: false,
      });
    }
  }

  function handleChange(event) {
    event.preventDefault();
    setText(event.target.value);
  }

  function handleSave(event) {
    event.preventDefault();
    console.log("handleSave called");
    if (text.trim() === "") return;
    if (text === todo.text) {
      actions.cancelEdit({ ...todo });
      return;
    }
    actions.updateTodo({
      ...todo,
      text: text,
      isEditing: false,
    });
  }
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => actions.toggleTodo({ ...todo })}
        className="todo-checkbox"
      />
      {todo.isEditing ? (
        <input
          autoFocus
          onBlur={handleSave}
          defaultValue={todo.text}
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
        <ButtonIcon>
          <Save size={16} />
        </ButtonIcon>
      ) : (
        <ButtonIcon onClick={() => actions.startEdit({ ...todo })}>
          <Pencil size={16} />
        </ButtonIcon>
      )}
      <ButtonIcon onClick={() => actions.deleteTodo({ ...todo })}>
        <Trash size={16} />
      </ButtonIcon>
    </div>
  );
}
