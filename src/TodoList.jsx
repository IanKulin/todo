/* eslint-disable react/prop-types */


function TodoList(props) {
    return (
        <ul>
            {props.todos.map(todo => (
                <li key={todo.id}>
                    {todo.todo_item}
                    <button onClick={() => props.onDeleteTodo(todo.id)}>
                        Done
                    </button>
                </li>
            ))}
        </ul>
    )
}


export default TodoList