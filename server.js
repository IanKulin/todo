// Simple Express ToDo app using SQLite3 & HTMX

const express = require('express');
const app = express();
const port = 3000;


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/todos.sqlite');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


function returnToDoList(rec, res) {
    db.all('SELECT * FROM todos', (err, rows) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send('<li>database error</li>');
        }
       // loop through the rows and create a list item for each
        let list = '';
        rows.forEach(row => {
            list += `<li>${row.todo_item}`;
            list += `<button hx-delete="todos/${row.id}" hx-target="closest li" hx-swap="outerHTML">Done</button></li>`;
        });
        res.status(200).send(list);
    });
};   


app.get('/todos', (req, res) => {
    returnToDoList(req, res);
});


app.post('/todos', (req, res) => {
    if (!req.body.todo_item) {
        return res.status(400).send('Missing todo_item field in request body');
    }
    db.run('INSERT INTO todos (todo_item) VALUES (?)', req.body.todo_item, function(err) {
        if (err) {
            console.log(err.message);
            return res.status(500).send('<li>database error</li>');
        }
        returnToDoList(req, res);
    });
});


app.delete('/todos/:id', (req, res) => {
    db.run('DELETE FROM todos WHERE id = ?', req.params.id, (err) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send('<li>database error</li>');
        }
        res.status(200).end();
    });
});


// if it doesn't exist, create the table
db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, todo_item TEXT)');


// close the database gracefully on exit
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Database closed.');
    });
    process.exit(0);
});


// start the server on port 3000    
app.listen(port, () => console.log(`Todo app listening on http://localhost:${port}`));



