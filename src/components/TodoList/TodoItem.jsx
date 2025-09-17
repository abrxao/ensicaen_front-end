import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/TodoContext";
import "./TodoItem.css";
export function TodoItem() {
  // TODO -
  // Integrate context
  const { theme, setTheme } = useContext(ThemeContext);
  const [isCompleted, setIsCompleted] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [text, setText] = useState(theme);

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => {
          setIsCompleted(!isCompleted);
        }}
      />
      {isEditing ? (
        <input
          defaultValue={text}
          onChange={(event) => {
            event.preventDefault();
            setIsCompleted((value) => !value);
            setText(event.target.value);
          }}
        />
      ) : (
        <span>{theme}</span>
      )}
      {isEditing ? (
        <button
          onClick={() => {
            setTheme(text);
            setIsEditing(false);
          }}
        >
          Confirm
        </button>
      ) : (
        <button
          onDoubleClick={() => {
            console.log("true");
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      )}
      <button onClick={() => console.log(isCompleted)}>Delete</button>
    </div>
  );
}
