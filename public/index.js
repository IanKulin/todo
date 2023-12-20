// index.js - code for simple todo app
// json data served from node endpoint

// Get todos from node endpoint
fetch('/todos')
    .then(res => res.json())
    .then(todos => {
        // Loop through todos and add to list
        todos.forEach(todo => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.innerHTML = 'Done';
            button.addEventListener('click', () => {
                console.log('clicked')
                fetch('/todos/' + todo.id, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        li.remove();
                    });
            });

            // Create a text node with the todo text and append it to the li
            const todoText = document.createTextNode(todo.todo);
            li.appendChild(todoText);

            // Then append the delete button
            li.appendChild(button);

            document.querySelector('#todos').appendChild(li);
        });
    });
// Add a todo
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
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.innerHTML = 'Done';
            button.addEventListener('click', () => {
                console.log('clicked')
                fetch('/todos/' + data.id, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        li.remove();
                    });
            });

            // Create a text node with the todo text and append it to the li
            const todoText = document.createTextNode(todo);
            li.appendChild(todoText);

            // Then append the delete button
            li.appendChild(button);

            document.querySelector('#todos').appendChild(li);
            document.querySelector('#todo').value = '';
        });
}); 