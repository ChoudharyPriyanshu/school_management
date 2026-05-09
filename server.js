require("dotenv").config();

const express = require("express");
const cors = require("cors");
const schoolRoutes = require("./routes/schoolRoutes");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", schoolRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "School Management API is running.",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    await db.execute("SELECT 1");
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
});
