import PropTypes from 'prop-types';


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


TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    onDeleteTodo: PropTypes.func.isRequired
};


export default TodoList;
