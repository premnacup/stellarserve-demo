const express = require("express");
const router = express.Router();
const db = require("../database");

// Get all restaurants
router.get("/", (req, res) => {
    const query = `
    SELECT 
      restaurants.*, 
      AVG(reviews.rating) as avg_rating,
      COUNT(reviews.id) as review_count
    FROM restaurants
    LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id
    GROUP BY restaurants.id
  `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get a single restaurant
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const query = `
    SELECT 
      restaurants.*, 
      AVG(reviews.rating) as avg_rating,
      COUNT(reviews.id) as review_count
    FROM restaurants
    LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id
    WHERE restaurants.id = ?
    GROUP BY restaurants.id
  `;
    db.get(query, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Restaurant not found" });
        res.json(row);
    });
});


// Get menu by restaurant
router.get("/:restaurantId/menu", (req, res) => {
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

module.exports = router;
