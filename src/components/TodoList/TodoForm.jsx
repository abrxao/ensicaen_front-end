import { useState } from "react";
import { useTodoContext } from "../../contexts/TodoContext";

export function TodoForm() {
  const { actions } = useTodoContext();

  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (text.trim().length) {
      actions.addTodo(text.trim());
      setText((text) => {
        return "";
      });
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <input
        defaultValue={text}
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}
