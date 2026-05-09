const db = require("../db");
const calculateDistance = require("../utils/distance");

const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (
      name === undefined ||
      address === undefined ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, address, latitude, longitude.",
      });
    }

    if (
      typeof name !== "string" ||
      name.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Name must be a non-empty string.",
      });
    }

    if (
      typeof address !== "string" ||
      address.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Address must be a non-empty string.",
      });
    }

    const lat = parseFloat(latitude);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      return res.status(400).json({
        success: false,
        message: "Latitude must be a valid number between -90 and 90.",
      });
    }

    const lon = parseFloat(longitude);
    if (isNaN(lon) || lon < -180 || lon > 180) {
      return res.status(400).json({
        success: false,
        message: "Longitude must be a valid number between -180 and 180.",
      });
    }

    const query =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    const values = [name.trim(), address.trim(), lat, lon];

    const [result] = await db.execute(query, values);

    return res.status(201).json({
      success: true,
      message: "School added successfully.",
      data: {
        id: result.insertId,
        name: name.trim(),
        address: address.trim(),
        latitude: lat,
        longitude: lon,
      },
    });
  } catch (error) {
    console.error("Error adding school:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Could not add school.",
    });
  }
};

const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        message:
          "Query parameters 'latitude' and 'longitude' are required.",
      });
    }

    const userLat = parseFloat(latitude);
    if (isNaN(userLat) || userLat < -90 || userLat > 90) {
      return res.status(400).json({
        success: false,
        message: "Latitude must be a valid number between -90 and 90.",
      });
    }

    const userLon = parseFloat(longitude);
    if (isNaN(userLon) || userLon < -180 || userLon > 180) {
      return res.status(400).json({
        success: false,
        message: "Longitude must be a valid number between -180 and 180.",
      });
    }

    const [schools] = await db.execute("SELECT * FROM schools");

    if (schools.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No schools found in the database.",
        count: 0,
        data: [],
      });
    }

    const schoolsWithDistance = schools.map((school) => ({
      id: school.id,
      name: school.name,
      address: school.address,
      latitude: school.latitude,
      longitude: school.longitude,
      distance: calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      ),
    }));

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    return res.status(200).json({
      success: true,
      message: "Schools fetched and sorted by proximity.",
      count: schoolsWithDistance.length,
      data: schoolsWithDistance,
    });
  } catch (error) {
    console.error("Error fetching schools:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Could not fetch schools.",
    });
  }
};

module.exports = { addSchool, listSchools };
