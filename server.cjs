// Simple Express ToDo app using SQLite3
/* eslint-disable no-undef */

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
    res.status(200).json(rows);
  });
});


app.post('/todos', (req, res) => {
    if (!req.body.todo_item) {
        return res.status(400).json({ error: 'Missing todo_item field in request body' });
    }
    db.run('INSERT INTO todos (todo_item) VALUES (?)', req.body.todo_item, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // well behaved APIs return the newly created resource
        db.get('SELECT * FROM todos WHERE id = ?', this.lastID, (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json(row);
        });
    });
});


app.delete('/todos/:id', (req, res) => {
  db.run('DELETE FROM todos WHERE id = ?', req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.status(204).end();
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

