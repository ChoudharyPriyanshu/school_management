# School Management API

A REST API to manage school records and retrieve them sorted by proximity using the Haversine formula. Built with Node.js, Express, and MySQL.

## Tech Stack

- **Node.js** — Runtime
- **Express.js** — Web framework
- **MySQL** — Database
- **mysql2** — MySQL driver
- **dotenv** — Environment config
- **cors** — Cross-origin support

## Project Structure

```
├── server.js              # Entry point
├── db.js                  # MySQL connection pool
├── schema.sql             # Database schema + seed data
├── routes/
│   └── schoolRoutes.js    # Route definitions
├── controllers/
│   └── schoolController.js  # Request handlers
├── utils/
│   └── distance.js        # Haversine formula
└── postman/
    └── School_Management_API.postman_collection.json
```

## Installation

**Prerequisites:** Node.js (v14+), MySQL (v5.7+)

```bash
git clone https://github.com/ChoudharyPriyanshu/school_management.git
cd school_management
npm install
```

Create a `.env` file in the root directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
```

Set up the database:

```bash
mysql -u root -p < schema.sql
```

Start the server:

```bash
npm start        # production
npm run dev      # development (auto-reload)
```

## API Endpoints

### `POST /addSchool`

Adds a new school to the database.

**Request Body:**

```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi",
  "latitude": 28.5672,
  "longitude": 77.2410
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "School added successfully.",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Mathura Road, New Delhi",
    "latitude": 28.5672,
    "longitude": 77.241
  }
}
```

**Validation:**
- All fields required
- `name` and `address` must be non-empty strings
- `latitude`: -90 to 90
- `longitude`: -180 to 180

---

### `GET /listSchools`

Returns all schools sorted by distance from the given coordinates.

**Query Parameters:**

| Param     | Type  | Required | Description      |
|-----------|-------|----------|------------------|
| latitude  | float | Yes      | User's latitude  |
| longitude | float | Yes      | User's longitude |

**Example:**

```
GET /listSchools?latitude=28.6139&longitude=77.2090
```

**Response (200):**

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
    }
  ]
}
```

## Example Requests

**Add a school:**

```bash
curl -X POST https://your-api-url.onrender.com/addSchool \
  -H "Content-Type: application/json" \
  -d '{"name": "ABC School", "address": "Delhi", "latitude": 28.6139, "longitude": 77.2090}'
```

**List schools by proximity:**

```bash
curl "https://your-api-url.onrender.com/listSchools?latitude=28.6139&longitude=77.2090"
```

A Postman collection is also available at `postman/School_Management_API.postman_collection.json`.

## Deployment (Render)

1. Push the repo to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Connect your GitHub repository
4. Set the following:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables in the Render dashboard:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
6. For MySQL, use a managed provider like [Aiven](https://aiven.io/), [PlanetScale](https://planetscale.com/), or [Railway](https://railway.app/)

## License

ISC
