// Simple Express ToDo app using SQLite3 & HTMX

const express = require('express');
const app = express();
const port = 3000;


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/todos.sqlite');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


function htmlForTodoItem(uid, item_text) {
  let html = `<li>${item_text}`;
  html += `<button hx-delete="todos/${uid}" hx-target="closest li" `;
  html += 'hx-swap="outerHTML">Done</button></li>';
  return html;
}


app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send('<li>database error</li>');
    }
    // loop through the rows and create a list item for each
    let list = '';
    rows.forEach(row => {
      list += htmlForTodoItem(row.id, row.todo_item);
    });
    res.status(200).send(list);
  });
});


app.post('/todos', (req, res) => {
  if (!req.body.todo_item) {
    return res.status(400).send('Missing todo_item field in request body');
  }
  db.run('INSERT INTO todos (todo_item) VALUES (?)', req.body.todo_item, function (err) {
    if (err) {
      console.log(err.message);
      return res.status(500).send('<li>database error</li>');
    }
    // return just this item for HTMX to insert at the list end
    res.status(200).send(htmlForTodoItem(this.lastID, req.body.todo_item));
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



