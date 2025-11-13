import "./App.css";
import { TodoList } from "src/components/TodoGroup/TodoList";
import { TodoForm } from "src/components/TodoGroup/TodoForm";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router";
import { PATHS } from "src/paths";
import Header from "./components/Header";
import TodoFilter from "./components/TodoGroup/TodoFilter";
import TodoStatus from "./components/TodoGroup/TodoStatus";
import { useTodoAPI } from "./hooks/useTodoAPI";
import { useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { ArchivedTaskList } from "./components/ArchivedTaskList";
import PageNotFound from "./components/pages/ErrorsPage/PageNotFound";
import Home from "./components/pages/Home";

function App() {
  const { loading, fetchTodos } = useTodoAPI();

  useEffect(() => {
    fetchTodos(10);
  }, []);

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      <Header />
      <section className="todo-content">
        <Routes>
          <Route
            path={PATHS.TODOS.href}
            element={
              <>
                <TodoStatus />
                <TodoFilter />
                <TodoForm />
                <TodoList />
              </>
            }
          />
          <Route path={PATHS.HOME.href} element={<Home />} />
          <Route
            path={PATHS.ARCHIVED_TODOS.href}
            element={<ArchivedTaskList />}
          />
          <Route path={""} element={<Home />} />
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
      </section>
      <LoadingScreen loading={loading} />
    </>
  );
}

export default App;
