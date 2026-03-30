# 🍽️ StellarServe

A full-stack academic project simulating an online food delivery platform.

## Project Structure

```text
stellarserve-demo
├── client/     # React + Vite frontend
├── server/     # Express API + SQLite database
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

### Backend Setup

```bash
cd server
npm install
npm run dev
```

Server operates at `http://localhost:5000`. Database is initialized locally in the `server/` directory as `stellarserve.db`.

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Client operates at `http://localhost:5173`.

## Tech Stack

- **Frontend**: React, Vite, Axios, React Router
- **Backend**: Express, SQLite3, Nodemon
- **Design**: Vanilla CSS

## API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/customers/users` | GET | Returns a list of all users/customers (testing only) |
| `/customers/register` | POST | Register a new customer |
| `/customers/login` | POST | Login a customer |
| `/restaurants` | GET | Returns a list of all restaurants |
| `/restaurants/:id` | GET | Returns details for a specific restaurant |
| `/restaurants/:restaurantId/menu` | GET | Returns the menu for a specific restaurant |
| `/orders` | GET | Returns a list of all orders |
| `/orders` | POST | Create a new order |
| `/orders/:id` | GET | Returns a specific order by ID |
| `/orders/:id/items` | GET | Returns items for a specific order |
| `/orders/customer/:customer_id` | GET | Returns all orders for a specific customer |
| `/orders/debug/full` | GET | Debug endpoint for full order details |
| `/favorites` | POST | Add a restaurant to favorites |
| `/favorites/:customer_id` | GET | Returns favorites for a specific customer |
| `/favorites/:customer_id/:restaurant_id` | DELETE | Remove a restaurant from favorites |
| `/reviews` | POST | Create a new review |
| `/reviews/restaurant/:restaurant_id` | GET | Returns reviews for a specific restaurant |
| `/reviews/order/:order_id` | GET | Returns reviews for a specific order |
| `/restaurant-admins/register` | POST | Register a new restaurant admin |
| `/restaurant-admins/login` | POST | Login a restaurant admin |
| `/restaurant-admins/:restaurantId/stats` | GET | Returns dashboard stats for a restaurant |
| `/restaurant-admins/:restaurantId/orders` | GET | Returns all orders for a specific restaurant |
| `/restaurant-admins/:restaurantId/orders/:orderId/status` | PUT | Update the status of a specific order |
| `/restaurant-admins/:restaurantId/menu` | POST | Add a new menu item to a restaurant |
| `/restaurant-admins/:restaurantId/menu/:itemId` | PUT | Update an existing menu item |
| `/restaurant-admins/:restaurantId/menu/:itemId` | DELETE | Delete an existing menu item |

---

_Note: This project is developed for academic purposes._
