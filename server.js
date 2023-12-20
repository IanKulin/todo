// Simple Express ToDo app using SQLite3

const express = require('express');
const app = express();
const port = 3000;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/todos.sqlite');

app.use(express.json());
app.use(express.static('public'));


app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


app.post('/todos', (req, res) => {
    console.log(req.body)
  db.run('INSERT INTO todos (todo_item) VALUES (?)', req.body.todo_item, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json({ message: 'success' });
  });
});


app.delete('/todos/:id', (req, res) => {
  db.run('DELETE FROM todos WHERE id = ?', req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json({ message: 'success' });
  });
});


// if it doesn't exist, create the table
db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, todo_item TEXT)');


// start the server on port 3000    
app.listen(port, () => console.log(`Todo app listening on port ${port}!`));



