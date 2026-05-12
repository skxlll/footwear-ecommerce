const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors()); // Allows React to connect
app.use(express.json()); // Allows server to accept JSON data

// ---------------------------------------------------------
// DATABASE CONNECTION POOL
// ---------------------------------------------------------
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log(
      "✅ Successfully connected to MySQL Database: ladies_footwear_db",
    );
    connection.release();
  }
});

// ---------------------------------------------------------
// API ROUTES
// ---------------------------------------------------------

// 1. Health Check Route
app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "API is running smoothly." });
});

// 2. Fetch All Products (with variations later)
app.get("/api/products", (req, res) => {
  // A simple query to get our core products
  const query = "SELECT * FROM products";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch products" });
    }
    res.status(200).json(results);
  });
});

// ---------------------------------------------------------
// START SERVER
// ---------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
