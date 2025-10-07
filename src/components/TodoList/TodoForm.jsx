import { useState } from "react";
import { useTodoContext } from "/src/contexts/TodoContext";
import Button from "/src/components/ui/Button";
import InputText from "/src/components/ui/InputText";

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
      <InputText
        value={text}
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
      <Button>ADD</Button>
    </form>
  );
}
