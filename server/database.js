const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./stellarserve.db", (err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to SQLite database.");
    // Increase busy timeout to 10 seconds to handle concurrent access better
    db.configure("busyTimeout", 10000);
  }
});

// Create tables
db.serialize(() => {
  const handleErr = (tableName) => (err) => {
    if (err) {
      console.error(`Error creating/initializing ${tableName}:`, err.message);
    }
  };

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT
    )
  `, handleErr("users"));

  db.run(`
    CREATE TABLE IF NOT EXISTS restaurants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `, handleErr("restaurants"));

  db.run(
    `INSERT OR IGNORE INTO restaurants (id, name) VALUES (1, 'Pizza Palace')`,
    handleErr("restaurants seed 1")
  );
  db.run(
    `INSERT OR IGNORE INTO restaurants (id, name) VALUES (2, 'Sushi World')`,
    handleErr("restaurants seed 2")
  );

  db.run(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      restaurant_id INTEGER,
      name TEXT,
      price REAL
    )
  `, handleErr("menu_items"));

  db.run(`
    INSERT OR IGNORE INTO menu_items (id, restaurant_id, name, price)
    VALUES
    (1, 1, 'Pepperoni Pizza', 12.99),
    (2, 1, 'Cheese Pizza', 10.99),
    (3, 2, 'Salmon Roll', 8.99),
    (4, 2, 'Tuna Roll', 9.99)
  `, handleErr("menu_items seed"));

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL,
      restaurant_id INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      total REAL NOT NULL,
      payment_status TEXT DEFAULT 'unpaid',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, handleErr("orders"));

  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      menu_item_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      FOREIGN KEY(order_id) REFERENCES orders(id)
    )
  `, handleErr("order_items"));
});

module.exports = db;

