// index.js - code for simple todo app
// json data served from node endpoint

// Function to create a todo item
function createTodoItem(todoText, id) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.innerHTML = 'Done';
    button.addEventListener('click', () => handleDelete(id, li));

    // Create a text node with the todo text and append it to the li
    const todoTextNode = document.createTextNode(todoText);
    li.appendChild(todoTextNode);

    // Then append the delete button
    li.appendChild(button);

    return li;
}


function handleDelete(id, li) {
    fetch('/todos/' + id, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(() => {
            li.remove();
        });
}

// Fetch the todo items to build the list
fetch('/todos')
    .then(res => res.json())
    .then(todos => {
        // Loop through todos and add to list
        todos.forEach(todo => {
            const li = createTodoItem(todo.todo, todo.id);
            document.querySelector('#todos').appendChild(li);
        });
    });


// handler for adding a todo item
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const todo = document.querySelector('#todo').value;
    fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ todo })
    })
        .then(res => res.json())
        .then(data => {
            const li = createTodoItem(todo, data.id);
            document.querySelector('#todos').appendChild(li);
            document.querySelector('#todo').value = '';
        });
});