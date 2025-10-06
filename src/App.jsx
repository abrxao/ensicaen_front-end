import "./App.css";
import { TodoList } from "/src/components/TodoList/TodoList";
import { TodoProvider } from "/src/contexts/TodoContext";
import { TodoForm } from "/src/components/TodoList/TodoForm";
import { Toaster } from "react-hot-toast";
import { Trans } from "@lingui/react/macro";
import DropDownLangue from "./components/DropDownLangue/DropDownLangue";
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher";

function App() {
  return (
    <TodoProvider>
      <Toaster position="bottom-right" reverseOrder={true} />
      <section className="todo-content">
        <DropDownLangue />
        <ThemeSwitcher />
        <h2>
          <Trans>Pour faire</Trans>
        </h2>
        <TodoForm />
        <TodoList />
      </section>
    </TodoProvider>
  );
}

export default App;
