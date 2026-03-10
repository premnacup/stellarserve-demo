const express = require("express");
const cors = require("cors");
const db = require("./database");

// Import Routes
const customerRoutes = require("./routes/customers");
const restaurantRoutes = require("./routes/restaurants");
const orderRoutes = require("./routes/orders");
const favoritesRoutes = require("./routes/favorites");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("StellarServe API is running");
});

// Load Modular Routes
app.use("/customers", customerRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/orders", orderRoutes);
app.use("/favorites", favoritesRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
