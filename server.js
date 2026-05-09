// ============================================================
// server.js — Application Entry Point
// ============================================================
// Initializes Express, loads environment variables, applies
// middleware, mounts routes, and starts the HTTP server.
// ============================================================

// Load environment variables from .env file (must be first)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const schoolRoutes = require("./routes/schoolRoutes");
const db = require("./db");

// Initialize Express application
const app = express();

// ---- Middleware ----
app.use(cors());            // Enable Cross-Origin Resource Sharing
app.use(express.json());    // Parse incoming JSON request bodies

// ---- Routes ----
app.use("/", schoolRoutes);

// ---- Health Check ----
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "School Management API is running.",
  });
});

// ---- 404 Handler ----
// Catches requests to undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// ---- Start Server ----
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`\n🚀  Server is running on port ${PORT}`);
  console.log(`📡  API Base URL: http://localhost:${PORT}\n`);

  // Verify database connection on startup
  try {
    await db.execute("SELECT 1");
    console.log("✅  MySQL database connected successfully.\n");
  } catch (error) {
    console.error("❌  MySQL connection failed:", error.message);
    console.error("    Please check your .env configuration and ensure MySQL is running.\n");
  }
});
