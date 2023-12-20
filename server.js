// Simple Express ToDo app using SQLite3

const express = require('express');
const app = express();
const port = 3000;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/test.sqlite');

app.use(express.json());
app.use(express.static('public'));

// CRUD REST API endpoints for /todos

// GET /todos
app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// if it doesn't exist, create the table
db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, todo TEXT)');

// seed the table with some data
db.run('INSERT INTO todos (todo) VALUES (?)', ['Buy milk']);
db.run('INSERT INTO todos (todo) VALUES (?)', ['Buy eggs']);
db.run('INSERT INTO todos (todo) VALUES (?)', ['Buy bread']);



