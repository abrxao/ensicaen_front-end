import "./App.css";
import { TodoList } from "/src/components/TodoList/TodoList";
import { TodoProvider } from "/src/contexts/TodoContext";
import { TodoForm } from "/src/components/TodoList/TodoForm";
import { Toaster } from "react-hot-toast";
import { Trans } from "@lingui/react/macro";
import DropDownLangue from "./components/DropDownLangue/DropDownLangue";
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher";
import { Routes, Route, Navigate } from "react-router";
import { PATHS } from "/src/paths";
import NavigationMenu from "/src/components/NavigationMenu";

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
        <NavigationMenu />
        <Routes>
          <Route
            path={PATHS.TODOS.href}
            element={
              <>
                <TodoForm />
                <TodoList />
              </>
            }
          />
          <Route
            path="/"
            element={<Navigate to={PATHS.TODOS.href} replace />}
          />
        </Routes>
        <Routes>
          <Route path={PATHS.HOME.href} element={<></>} />
          <Route
            path="/"
            element={<Navigate to={PATHS.TODOS.href} replace />}
          />
        </Routes>
      </section>
    </TodoProvider>
  );
}

export default App;
