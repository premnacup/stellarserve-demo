const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./stellarserve.db", (err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS restaurants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `);
  db.run(
    `INSERT OR IGNORE INTO restaurants (id, name) VALUES (1, 'Pizza Palace')`,
  );
  db.run(
    `INSERT OR IGNORE INTO restaurants (id, name) VALUES (2, 'Sushi World')`,
  );

  db.run(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      restaurant_id INTEGER,
      name TEXT,
      price REAL
      )
      `);

  db.run(`
        INSERT OR IGNORE INTO menu_items (id, restaurant_id, name, price)
        VALUES
        (1, 1, 'Pepperoni Pizza', 12.99),
        (2, 1, 'Cheese Pizza', 10.99),
        (3, 2, 'Salmon Roll', 8.99),
        (4, 2, 'Tuna Roll', 9.99)
      `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER,
      status TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      menu_item_id INTEGER,
      quantity INTEGER
    )
  `);
});

module.exports = db;
