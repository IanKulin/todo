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

  const addTodo = (newTodo) => {
    // fetch('http://localhost:3000/todos', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newTodo),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     // Update the todos state with the new todo
    //     setTodos([...todos, data]);
    //   });
  };

  const deleteTodo = (id) => {
    // console.log(id);
    // fetch(`http://localhost:3000/todos/${id}`, {
    //   method: 'DELETE',
    // })
    //   .then(() => {
    //     setTodos(todos.filter(todo => todo.id !== id));
    //   });
  };

  return (
    <main>
      {isLoggedIn && <CredentialsBar onLogout={handleLogout} />}
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
