# 🏫 School Management API

A RESTful API system built with **Node.js**, **Express.js**, and **MySQL** to manage school records and retrieve them sorted by geographical proximity using the **Haversine formula**.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
  - [Add School](#1-add-school)
  - [List Schools](#2-list-schools)
- [Example Requests & Responses](#example-requests--responses)
- [Deployment](#deployment)

---

## 🔍 Overview

This API provides two core functionalities:

1. **Add School** — Insert a new school record into the MySQL database with name, address, latitude, and longitude.
2. **List Schools** — Retrieve all schools sorted by proximity to a given location using the Haversine distance formula.

---

## 🛠 Tech Stack

| Technology | Purpose                  |
| ---------- | ------------------------ |
| Node.js    | Runtime environment      |
| Express.js | Web framework            |
| MySQL      | Relational database      |
| mysql2     | MySQL driver for Node.js |
| dotenv     | Environment variables    |
| cors       | Cross-origin support     |
| nodemon    | Development auto-reload  |

---

## 📁 Project Structure

```
school-management/
│
├── server.js                  # Application entry point
├── db.js                      # MySQL connection pool
├── .env                       # Environment variables (not in repo)
├── .env.example               # Environment variable template
├── .gitignore                 # Git ignore rules
├── package.json               # Project metadata & dependencies
├── schema.sql                 # Database & table creation script
├── README.md                  # Project documentation
│
├── routes/
│   └── schoolRoutes.js        # Route definitions
│
├── controllers/
│   └── schoolController.js    # Business logic for APIs
│
├── utils/
│   └── distance.js            # Haversine formula utility
│
└── postman/
    └── School_Management_API.postman_collection.json
```

---

## 🚀 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (v5.7 or higher)
- [Git](https://git-scm.com/)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/school-management-api.git
cd school-management-api

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and fill in your MySQL credentials

# 4. Set up the database (see Database Setup section below)

# 5. Start the development server
npm run dev

# 6. Or start in production mode
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
```

| Variable    | Description                | Default            |
| ----------- | -------------------------- | ------------------ |
| PORT        | Server port                | 5000               |
| DB_HOST     | MySQL host                 | localhost          |
| DB_USER     | MySQL username             | root               |
| DB_PASSWORD | MySQL password             | (empty)            |
| DB_NAME     | MySQL database name        | school_management  |

---

## 🗄 Database Setup

### Option 1: Run the SQL Script

```bash
mysql -u root -p < schema.sql
```

### Option 2: Manual Setup

```sql
-- Create the database
CREATE DATABASE IF NOT EXISTS school_management;

-- Use the database
USE school_management;

-- Create the schools table
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

---

## 📡 API Endpoints

### Base URL

```
http://localhost:5000
```

---

### 1. Add School

**Endpoint:** `POST /addSchool`

**Description:** Adds a new school to the database.

**Request Body (JSON):**

```json
{
  "name": "ABC School",
  "address": "Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

**Validation Rules:**
- All fields (`name`, `address`, `latitude`, `longitude`) are required
- `name` and `address` must be non-empty strings
- `latitude` must be a number between -90 and 90
- `longitude` must be a number between -180 and 180

**Success Response (201):**

```json
{
  "success": true,
  "message": "School added successfully.",
  "data": {
    "id": 1,
    "name": "ABC School",
    "address": "Delhi",
    "latitude": 28.6139,
    "longitude": 77.209
  }
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "All fields are required: name, address, latitude, longitude."
}
```

---

### 2. List Schools

**Endpoint:** `GET /listSchools?latitude=28.6139&longitude=77.2090`

**Description:** Fetches all schools sorted by distance from the provided coordinates.

**Query Parameters:**

| Parameter | Type  | Required | Description          |
| --------- | ----- | -------- | -------------------- |
| latitude  | float | Yes      | User's latitude      |
| longitude | float | Yes      | User's longitude     |

**Success Response (200):**

```json
{
  "success": true,
  "message": "Schools fetched and sorted by proximity.",
  "count": 3,
  "data": [
    {
      "id": 2,
      "name": "St. Xavier's School",
      "address": "Connaught Place, New Delhi",
      "latitude": 28.6315,
      "longitude": 77.2167,
      "distance": 2.08
    },
    {
      "id": 3,
      "name": "Modern School",
      "address": "Barakhamba Road, New Delhi",
      "latitude": 28.6328,
      "longitude": 77.2264,
      "distance": 2.65
    },
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Mathura Road, New Delhi",
      "latitude": 28.5672,
      "longitude": 77.241,
      "distance": 5.91
    }
  ]
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "Query parameters 'latitude' and 'longitude' are required."
}
```

---

## Example Requests & Responses

### Using cURL

**Add a school:**

```bash
curl -X POST http://localhost:5000/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ABC School",
    "address": "Delhi",
    "latitude": 28.6139,
    "longitude": 77.2090
  }'
```

**List schools sorted by proximity:**

```bash
curl "http://localhost:5000/listSchools?latitude=28.6139&longitude=77.2090"
```

### Using Postman

A ready-to-import Postman collection is available at:  
`postman/School_Management_API.postman_collection.json`

Import it into Postman to test both endpoints with pre-configured requests.

---

## 🌐 Deployment

### Deploying to Render

1. Push your project to a GitHub repository.

2. Go to [render.com](https://render.com) and create a new **Web Service**.

3. Connect your GitHub repository.

4. Configure the service:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node

5. Add environment variables in the Render dashboard:
   ```
   PORT=5000
   DB_HOST=your-mysql-host
   DB_USER=your-mysql-user
   DB_PASSWORD=your-mysql-password
   DB_NAME=school_management
   ```

6. For the MySQL database, you can use a managed MySQL service such as:
   - [PlanetScale](https://planetscale.com/)
   - [Aiven](https://aiven.io/)
   - [Railway](https://railway.app/)
   - [Amazon RDS](https://aws.amazon.com/rds/)

7. Deploy and your API will be live!

---

## 📄 License

This project is open-source and available under the [ISC License](https://opensource.org/licenses/ISC).
