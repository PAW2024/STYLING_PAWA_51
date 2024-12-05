const express = require('express');
const db = require('../database/db');
const router = express.Router();
const bcrypt = require('bcrypt');

// Login Page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

// Login (POST)
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (isMatch) {
                    res.redirect('/todo');
                } else {
                    res.send('Invalid credentials');
                }
            });
        } else {
            res.send('User not found');
        }
    });
});

// Signup Page
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up Page' });
});

// Signup (POST)
router.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(sql, [username, hashedPassword, email], (err) => {
        if (err) throw err;
        res.redirect('/login');
    });
});

module.exports = router;
