const express = require("express");
const router = express.Router();
const db = require("../database");

// Get all favorites for a user
router.get("/:customer_id", (req, res) => {
    const { customer_id } = req.params;
    const query = `
    SELECT 
      restaurants.*, 
      AVG(reviews.rating) as avg_rating,
      COUNT(reviews.id) as review_count
    FROM restaurants
    JOIN favorites ON restaurants.id = favorites.restaurant_id 
    LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id
    WHERE favorites.customer_id = ?
    GROUP BY restaurants.id
  `;
    db.all(query, [customer_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add a favorite
router.post("/", (req, res) => {
    const { customer_id, restaurant_id } = req.body;
    db.run(
        `INSERT OR IGNORE INTO favorites (customer_id, restaurant_id) VALUES (?, ?)`,
        [customer_id, restaurant_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Added to favorites", changes: this.changes });
        },
    );
});

// Remove a favorite
router.delete("/:customer_id/:restaurant_id", (req, res) => {
    const { customer_id, restaurant_id } = req.params;
    db.run(
        `DELETE FROM favorites WHERE customer_id = ? AND restaurant_id = ?`,
        [customer_id, restaurant_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Removed from favorites", changes: this.changes });
        },
    );
});

module.exports = router;
