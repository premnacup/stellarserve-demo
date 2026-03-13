const express = require("express");
const router = express.Router();
const db = require("../database");

// POST a new review
router.post("/", (req, res) => {
    const { order_id, restaurant_id, rating, comment } = req.body;

    // First check if the order exists and is delivered
    const orderQuery = `SELECT status FROM orders WHERE id = ?`;
    db.get(orderQuery, [order_id], (err, order) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!order) return res.status(404).json({ error: "Order not found" });
        if (order.status.toLowerCase() !== "delivered") {
            return res.status(400).json({ error: "Only delivered orders can be reviewed" });
        }

        const query = `
            INSERT INTO reviews (order_id, restaurant_id, rating, comment)
            VALUES (?, ?, ?, ?)
        `;

        db.run(query, [order_id, restaurant_id, rating, comment], function (err) {
            if (err) {
                if (err.message.includes("UNIQUE constraint failed")) {
                    return res.status(400).json({ error: "This order has already been reviewed" });
                }
                return res.status(500).json({ error: err.message });
            }

            res.json({
                message: "Review submitted successfully",
                review_id: this.lastID
            });
        });
    });
});

// GET review for a specific order
router.get("/order/:order_id", (req, res) => {
    const { order_id } = req.params;
    const query = `SELECT * FROM reviews WHERE order_id = ?`;

    db.get(query, [order_id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row || { message: "No review found for this order" });
    });
});

// GET reviews for a restaurant
router.get("/restaurant/:restaurant_id", (req, res) => {
    const { restaurant_id } = req.params;
    const query = `
        SELECT reviews.*, users.name as customer_name
        FROM reviews
        JOIN orders ON reviews.order_id = orders.id
        JOIN users ON orders.customer_id = users.id
        WHERE reviews.restaurant_id = ?
        ORDER BY reviews.created_at DESC
    `;

    db.all(query, [restaurant_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
