import "./App.css";
import { TodoList } from "/src/components/TodoGroup/TodoList";
import { TodoProvider } from "/src/contexts/TodoContext";
import { TodoForm } from "/src/components/TodoGroup/TodoForm";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router";
import { PATHS } from "/src/paths";
import Header from "./components/Header";
import TodoFilter from "./components/TodoGroup/TodoFilter";

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
                <TodoFilter />
                <TodoForm />
                <TodoList />
              </>
            }
          />
          <Route path={PATHS.HOME.href} element={<></>} />
        </Routes>
      </section>
    </TodoProvider>
  );
}

export default App;
