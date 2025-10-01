import { useState } from "react";
import { useTodoContext } from "/src/contexts/TodoContext";
import "./TodoItem.css";
export function TodoItem({ todo }) {
  const { actions } = useTodoContext();
  const [text, setText] = useState(todo.text);

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => actions.toggleTodo({ ...todo })}
      />
      {todo.isEditing ? (
        <input
          defaultValue={todo.text}
          onChange={(event) => {
            event.preventDefault();
            setText(event.target.value);
          }}
        />
      ) : (
        <span>{todo.text}</span>
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
        <button onDoubleClick={() => actions.startEdit({ ...todo })}>
          Edit
        </button>
      )}
      <button onClick={() => actions.deleteTodo({ ...todo })}>Delete</button>
    </div>
  );
}
