/* eslint-disable react/prop-types */
import { useState } from 'react';

function AddTodoForm(props) {
    const [value, setValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!value) return;
        props.onAddTodo({ todo_item: value });
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="todo_item"
                id="todo"
                value={value}
                onChange={e => setValue(e.target.value)}
                required
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;