const express = require("express");
const router = express.Router();
const db = require("../database");

// Create a new order
router.post("/", (req, res) => {
    const { customer_id, restaurant_id, total, items } = req.body;

    const orderQuery = `
    INSERT INTO orders (customer_id, restaurant_id, total)
    VALUES (?, ?, ?)
  `;

    db.run(orderQuery, [customer_id, restaurant_id, total], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const orderId = this.lastID;

        const itemQuery = `
      INSERT INTO order_items (order_id, menu_item_id, quantity)
      VALUES (?, ?, ?)
    `;

        items.forEach((item) => {
            db.run(itemQuery, [orderId, item.menu_item_id, item.quantity]);
        });

        res.json({
            message: "Order created successfully",
            order_id: orderId
        });
    });
});

// Get all orders
router.get("/", (req, res) => {
    const query = `SELECT * FROM orders`;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

// Full debug orders info
router.get("/debug/full", (req, res) => {
    const query = `
    SELECT 
      orders.id AS order_id,
      orders.customer_id,
      restaurants.name AS restaurant,
      orders.status,
      orders.total,
      menu_items.name AS item_name,
      menu_items.price,
      order_items.quantity
    FROM orders
    JOIN restaurants ON orders.restaurant_id = restaurants.id
    JOIN order_items ON orders.id = order_items.order_id
    JOIN menu_items ON order_items.menu_item_id = menu_items.id
    ORDER BY orders.id
  `;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

// Get specific order
router.get("/:id", (req, res) => {
    const { id } = req.params;

    const query = `SELECT * FROM orders WHERE id = ?`;

    db.get(query, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(row);
    });
});

// Get order items with details
router.get("/:id/items", (req, res) => {
    const { id } = req.params;

    const query = `
    SELECT order_items.*, menu_items.name, menu_items.price
    FROM order_items
    JOIN menu_items ON order_items.menu_item_id = menu_items.id
    WHERE order_items.order_id = ?
  `;

    db.all(query, [id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

// Update order status
router.patch("/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const query = `
    UPDATE orders
    SET status = ?
    WHERE id = ?
  `;

    db.run(query, [status, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({
            message: "Order status updated"
        });
    });
});

// Get orders by customer ID
router.get("/customer/:customer_id", (req, res) => {
    const { customer_id } = req.params;
    const query = `
      SELECT 
        orders.*, 
        restaurants.name as restaurant_name,
        CASE WHEN reviews.id IS NOT NULL THEN 1 ELSE 0 END as has_review
      FROM orders 
      JOIN restaurants ON orders.restaurant_id = restaurants.id
      LEFT JOIN reviews ON orders.id = reviews.order_id
      WHERE customer_id = ? 
      ORDER BY created_at DESC
    `;
    db.all(query, [customer_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

module.exports = router;
