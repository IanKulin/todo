import { useEffect } from 'react';
import { useState } from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'
import './styles.css'


function App() {
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);


  const addTodo = (newTodo) => {
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
      .then(response => response.json())
      .then(data => {
        // Update the todos state with the new todo
        setTodos([...todos, data]);
      });
  };


  const deleteTodo = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      });
  };


  return (
    <main>
      <h1>To do</h1>
      <TodoList todos={todos} onDeleteTodo={deleteTodo}/>
      <AddTodoForm onAddTodo={addTodo} />
    </main>
  )
}


export default App
