const express = require("express");
const router = express.Router();
const db = require("../database");

// Register Restaurant Admin & Restaurant
router.post("/register", (req, res) => {
    const { existing_restaurant_id, restaurant_name, owner_name, email, password, phone, address, category } = req.body;

    const createAdmin = (restaurant_id) => {
        db.run(
            `INSERT INTO restaurant_admins (restaurant_id, owner_name, email, password, phone) VALUES (?, ?, ?, ?, ?)`,
            [restaurant_id, owner_name, email, password, phone],
            function (errAdmin) {
                if (errAdmin) {
                    return res.status(400).json({ error: "Failed to create admin: " + errAdmin.message });
                }
                res.json({
                    message: "Restaurant Admin registered successfully",
                    adminId: this.lastID,
                    restaurant_id
                });
            }
        );
    };

    if (existing_restaurant_id) {
        // Link to existing restaurant
        createAdmin(existing_restaurant_id);
    } else {
        // Create new restaurant first
        db.run(
            `INSERT INTO restaurants (name, address, category) VALUES (?, ?, ?)`,
            [restaurant_name, address, category],
            function (err) {
                if (err) {
                    return res.status(400).json({ error: "Failed to create restaurant: " + err.message });
                }
                createAdmin(this.lastID);
            }
        );
    }
});

// Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get(
        `SELECT a.*, r.name as restaurant_name 
         FROM restaurant_admins a 
         JOIN restaurants r ON a.restaurant_id = r.id 
         WHERE a.email = ? AND a.password = ?`,
        [email, password],
        (err, admin) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!admin) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            res.json({ message: "Login successful", admin });
        }
    );
});

// Dashboard: Get Stats (orders count, items count, etc.)
router.get("/:restaurantId/stats", (req, res) => {
    const { restaurantId } = req.params;

    db.get(`
        SELECT 
            (SELECT COUNT(*) FROM menu_items WHERE restaurant_id = ?) as total_menu_items,
            (SELECT COUNT(*) FROM orders WHERE restaurant_id = ?) as total_orders,
            (SELECT COUNT(*) FROM orders WHERE restaurant_id = ? AND status = 'pending') as pending_orders,
            (SELECT COUNT(*) FROM orders WHERE restaurant_id = ? AND status = 'Delivered') as delivered_orders,
            (SELECT AVG(rating) FROM reviews WHERE restaurant_id = ?) as avg_rating
    `, [restaurantId, restaurantId, restaurantId, restaurantId, restaurantId], (err, stats) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(stats);
    });
});

// Dashboard: Get Orders
router.get("/:restaurantId/orders", (req, res) => {
    const { restaurantId } = req.params;
    const query = `
      SELECT o.id, o.customer_id, u.name as customer_name, o.status, o.total, o.created_at,
      (
        SELECT GROUP_CONCAT(mi.name || ' x' || oi.quantity, ', ')
        FROM order_items oi
        JOIN menu_items mi ON oi.menu_item_id = mi.id
        WHERE oi.order_id = o.id
      ) as items_summary
      FROM orders o
      LEFT JOIN users u ON o.customer_id = u.id
      WHERE o.restaurant_id = ?
      ORDER BY o.created_at DESC
    `;
    db.all(query, [restaurantId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Dashboard: Update Order Status
router.put("/:restaurantId/orders/:orderId/status", (req, res) => {
    // In a real app we would verify req.user.restaurantId == restaurantId
    const { orderId } = req.params;
    const { status } = req.body;
    db.run(
        `UPDATE orders SET status = ? WHERE id = ? AND restaurant_id = ?`,
        [status, orderId, req.params.restaurantId],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Order updated successfully" });
        }
    );
});

// Dashboard: Create Menu Item
router.post("/:restaurantId/menu", (req, res) => {
    const { name, price } = req.body;
    db.run(
        `INSERT INTO menu_items (restaurant_id, name, price) VALUES (?, ?, ?)`,
        [req.params.restaurantId, name, price],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, message: "Menu item created" });
        }
    );
});

// Dashboard: Update Menu Item
router.put("/:restaurantId/menu/:itemId", (req, res) => {
    const { name, price } = req.body;
    db.run(
        `UPDATE menu_items SET name = ?, price = ? WHERE id = ? AND restaurant_id = ?`,
        [name, price, req.params.itemId, req.params.restaurantId],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Menu item updated" });
        }
    );
});

// Dashboard: Delete Menu Item
router.delete("/:restaurantId/menu/:itemId", (req, res) => {
    db.run(
        `DELETE FROM menu_items WHERE id = ? AND restaurant_id = ?`,
        [req.params.itemId, req.params.restaurantId],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Menu item deleted" });
        }
    );
});

module.exports = router;
