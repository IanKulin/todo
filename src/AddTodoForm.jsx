
import { useState } from 'react';
import PropTypes from 'prop-types';

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


AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};


export default AddTodoForm;