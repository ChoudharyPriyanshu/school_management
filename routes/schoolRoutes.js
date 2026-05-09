// ============================================================
// routes/schoolRoutes.js — School API Routes
// ============================================================
// Defines the route mappings for school-related endpoints.
// Routes are kept thin — all logic lives in the controller.
// ============================================================

const express = require("express");
const router = express.Router();
const { addSchool, listSchools } = require("../controllers/schoolController");

// POST /addSchool — Add a new school to the database
router.post("/addSchool", addSchool);

// GET /listSchools — List schools sorted by proximity to user's location
router.get("/listSchools", listSchools);

module.exports = router;
