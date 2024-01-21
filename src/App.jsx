import { useEffect } from "react";
import { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import CredentialsBar from "./CredentialsBar";
import Login from "./Login";
import "./styles.css";
import pb from "../services/pocketbase.js";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);

  const handleLogin = () => {
    setIsLoggedIn(pb.authStore.isValid);
  };

  const handleLogout = () => {
    pb.authStore.clear();
    setIsLoggedIn(pb.authStore.isValid);
  };

  // fetch todos from pocketbase
  useEffect(() => {
    pb.collection("todos")
      .getFullList()
      .then((records) => {
        setTodos(records);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // add a new todo to pocketbase
  const addTodo = (newTodo) => {
    pb.collection("todos")
      .create(newTodo)
      .then((record) => {
        setTodos([...todos, record]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // delete a todo from pocketbase
  const deleteTodo = (id) => {
    pb.collection("todos")
      .delete(id)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main>
      {isLoggedIn && <CredentialsBar onLogout={handleLogout} user={pb.authStore.model.email} />}
      <h1>To do</h1>
      {isLoggedIn ? (
        <>
          <TodoList todos={todos} onDeleteTodo={deleteTodo} />
          <AddTodoForm onAddTodo={addTodo} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </main>
  );
}

export default App;
