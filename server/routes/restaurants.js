const express = require("express");
const router = express.Router();
const db = require("../database");

// Get all restaurants
router.get("/", (req, res) => {
    db.all(`SELECT * FROM restaurants`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get a single restaurant
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM restaurants WHERE id = ?`, [id], (err, row) => {
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
