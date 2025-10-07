import { useState } from "react";
import { useTodoContext } from "/src/contexts/TodoContext";

export function TodoForm() {
  const { actions } = useTodoContext();

  const [text, setText] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (text.trim().length) {
      await actions.addTodo(text.trim());
      setText("");
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)} className="todo-form">
      <input
        value={text}
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}
