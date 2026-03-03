const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("StellarServe API is running");
});

// Register
app.post("/register", (req, res) => {
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
app.post("/login", (req, res) => {
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
app.get("/users", (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get all restaurants
app.get("/restaurants", (req, res) => {
  db.all(`SELECT * FROM restaurants`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get menu by restaurant
app.get("/menu/:restaurantId", (req, res) => {
  const { restaurantId } = req.params;

  db.all(
    `SELECT * FROM menu_items WHERE restaurant_id = ?`,
    [restaurantId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    },
  );
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
