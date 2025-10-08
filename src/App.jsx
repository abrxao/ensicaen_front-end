import "./App.css";
import { TodoList } from "/src/components/TodoGroup/TodoList";
import { TodoProvider } from "/src/contexts/TodoContext";
import { TodoForm } from "/src/components/TodoGroup/TodoForm";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router";
import { PATHS } from "/src/paths";
import Header from "./components/Header";

function App() {
  return (
    <TodoProvider>
      <Toaster position="bottom-right" reverseOrder={true} />
      <Header />

      <section className="todo-content">
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
