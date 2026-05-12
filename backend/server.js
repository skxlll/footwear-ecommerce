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
// 2. Fetch All Products with their primary image
app.get("/api/products", (req, res) => {
  // This query joins the product with its first available variation image
  const query = `
        SELECT 
            p.id, 
            p.name, 
            p.base_price AS price, 
            p.is_new_arrival AS isNew,
            (SELECT image_url FROM product_variations pv WHERE pv.product_id = p.id LIMIT 1) AS image,
            CASE p.category_id 
                WHEN 1 THEN 'Bridal'
                WHEN 2 THEN 'Heels'
                WHEN 3 THEN 'Office Wear'
                WHEN 4 THEN 'Party Wear'
                ELSE 'Collection'
            END as category
        FROM products p
    `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database query error:", err);
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
