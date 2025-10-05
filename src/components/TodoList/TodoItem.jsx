import { useState } from "react";
import { useTodoContext } from "/src/contexts/TodoContext";
import "./TodoItem.css";
import { Pencil, Trash } from "lucide-react";
export function TodoItem({ todo }) {
  const { actions } = useTodoContext();
  const [text, setText] = useState(todo.text);

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
          defaultValue={todo.text}
          onChange={(event) => {
            event.preventDefault();
            setText(event.target.value);
          }}
          className="todo-edit-input"
          type="text"
        />
      ) : (
        <span className="todo-text">{todo.text}</span>
      )}

      {todo.isEditing ? (
        <button
          onClick={() =>
            actions.updateTodo({
              ...todo,
              text: text,
              isEditing: false,
            })
          }
        >
          Confirm
        </button>
      ) : (
        <button
          onDoubleClick={() => actions.startEdit({ ...todo })}
          className="icon"
        >
          <Pencil size={16} />
        </button>
      )}
      <button onClick={() => actions.deleteTodo({ ...todo })} className="icon">
        <Trash size={16} />
      </button>
    </div>
  );
}
