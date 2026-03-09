const express = require("express");
const router = express.Router();
const db = require("../database");

// Register
router.post("/register", (req, res) => {
    const { name, email, password, role } = req.body;

    db.run(
        `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
        [name, email, password, role],
        function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({
                message: "User registered successfully",
                userId: this.lastID,
            });
        },
    );
});

// Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get(
        `SELECT * FROM users WHERE email = ? AND password = ?`,
        [email, password],
        (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!user) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            res.json({ message: "Login successful", user });
        },
    );
});

// View all users (testing only)
router.get("/users", (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

module.exports = router;
