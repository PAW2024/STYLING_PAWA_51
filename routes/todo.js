const express = require('express');
const db = require('../database/db');
const router = express.Router();

// Todo Page
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM todos';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('todo', { title: 'Todo List', todos: results });
    });
});

// Add Todo
router.post('/add', (req, res) => {
    const { title } = req.body;
    const sql = 'INSERT INTO todos (title) VALUES (?)';
    db.query(sql, [title], (err) => {
        if (err) throw err;
        res.redirect('/todo');
    });
});

module.exports = router;
