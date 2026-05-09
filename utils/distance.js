// ============================================================
// utils/distance.js — Haversine Distance Calculator
// ============================================================
// Calculates the great-circle distance between two points
// on the Earth's surface given their latitude and longitude.
// ============================================================

/**
 * Converts degrees to radians.
 *
 * @param {number} degrees - Angle in degrees
 * @returns {number} Angle in radians
 */
function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Calculates the distance between two geographic coordinates
 * using the Haversine formula.
 *
 * The Haversine formula determines the shortest distance
 * between two points on a sphere (great-circle distance).
 *
 * Formula:
 *   a = sin²(Δlat/2) + cos(lat1) * cos(lat2) * sin²(Δlon/2)
 *   c = 2 * atan2(√a, √(1−a))
 *   d = R * c
 *
 * @param {number} lat1 - Latitude of point 1 (in degrees)
 * @param {number} lon1 - Longitude of point 1 (in degrees)
 * @param {number} lat2 - Latitude of point 2 (in degrees)
 * @param {number} lon2 - Longitude of point 2 (in degrees)
 * @returns {number} Distance in kilometers (rounded to 2 decimal places)
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude differences to radians
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  // Convert latitudes to radians for the formula
  const radLat1 = toRadians(lat1);
  const radLat2 = toRadians(lat2);

  // Apply the Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance and round to 2 decimal places
  const distance = parseFloat((R * c).toFixed(2));

  return distance;
}

module.exports = calculateDistance;
