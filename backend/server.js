const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

// Login Endpoint
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user by email
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = results[0];

    // 2. FOR TESTING ONLY: Bypass bcrypt temporarily if using dummy DB data
    // In production, you MUST use: const match = await bcrypt.compare(password, user.password);
    const match =
      (password === "admin123" && user.email === "admin@aura.com") ||
      (password === "user123" && user.email === "jane@example.com");

    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    // 3. Generate JWT Token
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET || "fallback_super_secret_key",
      { expiresIn: "1d" },
    );

    // 4. Send token and user data to frontend
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
});

// ---------------------------------------------------------
// START SERVER
// ---------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
