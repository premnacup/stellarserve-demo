# 🍽️ StellarServe

A full-stack academic project simulating an online food delivery platform.

## Project Structure

stellarserve-demo
├── client/     # React + Vite frontend
├── server/     # Express API + SQLite database
└── README.md

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

| Endpoint       | Method | Description                       |
| :------------- | :----- | :-------------------------------- |
| `/restaurants` | GET    | Returns a list of all restaurants |
| `/customers`   | GET    | Returns a list of customers       |

---

_Note: This project is developed for academic purposes._
