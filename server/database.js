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
      name TEXT,
      address TEXT,
      category TEXT
    )
  `, handleErr("restaurants"));

  db.run(
    `INSERT OR IGNORE INTO restaurants (id, name, address, category) VALUES (1, 'Pizza Palace', '123 Pizza Lane, NY', 'Food')`,
    handleErr("restaurants seed 1")
  );
  db.run(
    `INSERT OR IGNORE INTO restaurants (id, name, address, category) VALUES (2, 'Sushi World', '456 Sea Bvd, SF', 'Food')`,
    handleErr("restaurants seed 2")
  );
  db.run(
    `INSERT OR IGNORE INTO restaurants (id, name, address, category) VALUES (3, 'Fresh Sip Drinks', '789 Beverage St, LA', 'Drink')`,
    handleErr("restaurants seed 3")
  );

  db.run(
    `INSERT OR IGNORE INTO restaurants (id, name, address, category) VALUES (4, 'Sweet Slice Bakery', '321 Dessert Ave, Chicago', 'Cake')`,
    handleErr("restaurants seed 4")
  );

  db.run(
    `INSERT OR IGNORE INTO restaurants (id, name, address , category) VALUES (5, 'Crunchy Snack Hub', '654 Snack Rd, Seattle', 'Snack')`,
    handleErr("restaurants seed 5")
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
  (1, 1, 'Pepperoni Pizza', 259),
  (2, 1, 'Cheese Pizza', 229),

  (3, 2, 'Salmon Roll', 189),
  (4, 2, 'Tuna Roll', 199),

  (5, 3, 'Iced Latte', 75),
  (6, 3, 'Strawberry Smoothie', 95),

  (7, 4, 'Chocolate Lava Cake', 129),
  (8, 4, 'Strawberry Cheesecake', 139),

  (9, 5, 'French Fries', 79),
  (10, 5, 'Chicken Nuggets', 109)
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

  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
        customer_id INTEGER NOT NULL,
        restaurant_id INTEGER NOT NULL,
        PRIMARY KEY (customer_id, restaurant_id),
        FOREIGN KEY (customer_id) REFERENCES users(id),
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
    )
  `, handleErr("favorites"));
});

module.exports = db;

