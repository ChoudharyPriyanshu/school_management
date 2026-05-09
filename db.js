// ============================================================
// db.js — MySQL Database Connection Pool
// ============================================================
// Creates and exports a reusable connection pool using mysql2.
// Uses environment variables for all sensitive configuration.
// ============================================================

const mysql = require("mysql2");

// Create a connection pool for better performance and
// automatic connection management (reuse, queuing, limits).
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "school_management",
  waitForConnections: true, // Queue requests when no connections are available
  connectionLimit: 10,      // Maximum number of connections in the pool
  queueLimit: 0,            // Unlimited queued requests (0 = no limit)
});

// Export the promise-based version of the pool
// so we can use async/await in our controllers.
module.exports = pool.promise();
