# Database Design & API Documentation

This document provides a comprehensive overview of the Database Design, Mongoose Schemas, entity relationships, and API Endpoints for the **DRB Driver Scheduling System**.

---

## 🗄️ Database Design

The system uses **MongoDB Atlas** as its cloud database provider. Object modeling is handled by **Mongoose** to enforce schema validation on the server side.

### Entity-Relationship Diagram (UML)

```mermaid
erDiagram
    ADMIN {
        ObjectId _id PK
        string username UNIQUE
        string email UNIQUE
        string password
        string name
        string role
        date created_at
        date updated_at
    }

    DRIVER {
        ObjectId _id PK
        string driver_id UNIQUE "DR001"
        string name
        string picture
        string phone
        string address
        string country
        string city
        object contact_channels "email, facebook, whatsapp, linkedin"
        string status "active, inactive, on leave"
        string national_id UNIQUE
        string gender
        date date_of_birth
        object driving_license "type, number, expiration, image"
        object vehicle "type, make, model, year, color"
        string assignedRoute_id FK "References Route"
        array pastAssignedRoutes "route_id, startLocation, endLocation, assigned_at, unassigned_at"
        string notes
        date joined_at
        date updated_at
    }

    ROUTE {
        ObjectId _id PK
        string route_id UNIQUE "RT001"
        string start_location
        string end_location
        string status "unassigned, assigned, in progress, completed, cancelled"
        string assignedDriver_id FK "References Driver"
        string lastDriver_id FK "References Driver"
        number distance
        string distance_unit "miles"
        number duration "minutes"
        string time_unit
        number cost
        string currency "USD"
        number max_speed
        string speed_unit "mph"
        string notes
        date created_at
        date updated_at
        date assigned_at
    }

    ACTIVITY_FEED {
        ObjectId _id PK
        string route_id
        string status
        object driver "id, name"
        string driver_id
        object last_driver "id, name"
        string last_driver_id
        date action_time
    }

    DRIVER ||--o| ROUTE : "currently assigned to"
    ROUTE ||--o| DRIVER : "assigned driver"
    ROUTE ||--o| DRIVER : "last driver"
```

---

### 📋 Mongoose Schema Definitions

#### 1. Admin Schema (`AdminModel.js`)
Stores administrator credentials for portal authentication.

*   `username` (String, required, unique, lowercase)
*   `email` (String, required, unique, lowercase)
*   `password` (String, required) - Bcrypt hashed
*   `name` (String, required)
*   `role` (String, default: "admin")
*   `created_at` (Date, default: Date.now)
*   `updated_at` (Date, default: Date.now)

#### 2. Driver Schema (`DriversModel.js`)
Tracks driver profile information, credentials, status, and assignments.

*   `driver_id` (String, required, unique) - Custom format (e.g. `DR001`)
*   `name` (String, required)
*   `picture` (String) - URL to profile picture
*   `phone` (String, required)
*   `address` (String)
*   `country` (String)
*   `city` (String)
*   `contact_channels` (Object) - `{ email, facebook, whatsapp, linkedin }`
*   `status` (String, required) - Values: `active`, `on leave`, `inactive`
*   `national_id` (String, required, unique)
*   `gender` (String, required)
*   `date_of_birth` (Date, required)
*   `driving_license` (Object, required) - `{ type, number, expiration, image }`
*   `vehicle` (Object, required) - `{ type, make, model, year, color }`
*   `assignedRoute_id` (String) - Current assigned route ID
*   `pastAssignedRoutes` (Array) - `[{ route_id, startLocation, endLocation, assigned_at, unassigned_at }]`
*   `notes` (String)
*   `joined_at` (Date, default: Date.now)
*   `updated_at` (Date, default: Date.now)

#### 3. Route Schema (`RoutesModel.js`)
Tracks route locations, travel stats, status, and assigned drivers.

*   `route_id` (String, required, unique) - Custom format (e.g. `RT001`)
*   `start_location` (String, required)
*   `end_location` (String, required)
*   `status` (String, required) - Values: `unassigned`, `assigned`, `in progress`, `completed`, `cancelled`
*   `assignedDriver_id` (String) - Driver ID currently assigned
*   `lastDriver_id` (String) - Driver ID previously assigned (for completed/cancelled routes)
*   `distance` (Number, required)
*   `distance_unit` (String, required, default: "miles")
*   `duration` (Number, required) - In minutes
*   `time_unit` (String, required, default: "minutes")
*   `cost` (Number, required)
*   `currency` (String, required, default: "USD")
*   `max_speed` (Number, required)
*   `speed_unit` (String, required, default: "mph")
*   `notes` (String)
*   `created_at` (Date, default: Date.now)
*   `updated_at` (Date, default: Date.now)
*   `assigned_at` (Date)

#### 4. Activity Feed Schema (`ActivityFeedsModel.js`)
Stores logs of status changes and driver scheduling activities.

*   `route_id` (String, required)
*   `status` (String, required)
*   `driver` (Object) - `{ id, name }`
*   `driver_id` (String)
*   `last_driver` (Object) - `{ id, name }`
*   `last_driver_id` (String)
*   `action_time` (Date, default: Date.now)

---

## 📡 API Reference Documentation

### Authentication Endpoints

#### 1. Admin Login
*   **URL:** `/admin-login`
*   **Method:** `POST`
*   **Body (JSON):**
    ```json
    {
      "usernameOrEmail": "admin",
      "password": "your_password"
    }
*   **Response (200 OK):**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsIn...",
      "admin": {
        "id": "670a4ef...",
        "name": "Ahmed Maher",
        "username": "admin",
        "email": "admin@drb-system.com"
      }
    }
    ```

---

### Dashboard Endpoints

#### 2. Get Dashboard Stats
*   **URL:** `/get-dashboard-stats`
*   **Method:** `GET`
*   **Response (200 OK):**
    ```json
    {
      "totalRoutes": 236,
      "totalDrivers": 25,
      "routeStatusCounts": {
        "unassigned": 33,
        "assigned": 118,
        "in progress": 39,
        "completed": 46,
        "cancelled": 0
      },
      "driverStatusCounts": {
        "active": 21,
        "on leave": 2,
        "inactive": 2
      }
    }
    ```

#### 3. Get Activity Feeds
*   **URL:** `/get-activity-feeds`
*   **Method:** `GET`
*   **Query Parameters:** `page`, `limit`, `search`, `status`
*   **Response (200 OK):**
    ```json
    {
      "data": [
        {
          "_id": "670a...",
          "route_id": "RT148",
          "status": "assigned",
          "driver_id": "DR003",
          "driver": { "id": "DR003", "name": "John Smith" },
          "action_time": "2026-06-17T03:35:50.123Z"
        }
      ],
      "currentPage": 1,
      "totalPages": 15,
      "totalDocs": 150
    }
    ```

---

### Drivers Endpoints

#### 4. Get All Drivers
*   **URL:** `/get-all-drivers`
*   **Method:** `GET`
*   **Query Parameters:** `page`, `limit`, `search`, `status`

#### 5. Add New Driver
*   **URL:** `/add-new-driver`
*   **Method:** `POST`
*   **Headers:** `Authorization: Bearer <token>`
*   **Body (JSON):** Requires full driver details including personal, license, and vehicle properties.

#### 6. Edit Driver
*   **URL:** `/edit-driver/:id`
*   **Method:** `PUT`
*   **Headers:** `Authorization: Bearer <token>`

#### 7. Delete Driver
*   **URL:** `/delete-driver/:id`
*   **Method:** `DELETE`
*   **Headers:** `Authorization: Bearer <token>`

---

### Routes Endpoints

#### 8. Get All Routes
*   **URL:** `/get-all-routes`
*   **Method:** `GET`
*   **Query Parameters:** `page`, `limit`, `status`, `search`

#### 9. Add New Route
*   **URL:** `/add-new-route`
*   **Method:** `POST`
*   **Headers:** `Authorization: Bearer <token>`
*   **Body (JSON):**
    ```json
    {
      "start_location": "Miami Free Zone, FL",
      "end_location": "Atlanta Logistics Hub, GA",
      "distance": 660,
      "duration": 720,
      "cost": 1280.50,
      "max_speed": 70,
      "notes": "Urgent shipment"
    }
    ```

---

## 🚀 Postman Collection Integration

You can copy the JSON content below and save it locally as **`DRB_Scheduling_System.postman_collection.json`** to import it directly into **Postman** (File -> Import).

```json
{
	"info": {
		"_postman_id": "8f8ef1d2-03d1-4be3-abfa-e129188bf205",
		"name": "DRB - Driver Scheduling System API",
		"description": "API collection for managing delivery routes, drivers profiles, dashboard telemetry, and authentication.",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Authentication",
			"item": [
				{
					"name": "Admin Login",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"usernameOrEmail\": \"admin\",\n    \"password\": \"your_password\"\n}"
						},
						"url": {
							"raw": "{{baseUrl}}/admin-login",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"admin-login"
							]
						}
					}
				}
			]
		},
		{
			"name": "Dashboard & Telemetry",
			"item": [
				{
					"name": "Get Dashboard Stats",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{baseUrl}}/get-dashboard-stats",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"get-dashboard-stats"
							]
						}
					}
				},
				{
					"name": "Get Activity Feeds",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{baseUrl}}/get-activity-feeds?page=1&limit=10",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"get-activity-feeds"
							],
							"query": [
								{
									"key": "page",
									"value": "1"
								},
								{
									"key": "limit",
									"value": "10"
								}
							]
						}
					}
				}
			]
		},
		{
			"name": "Drivers Management",
			"item": [
				{
					"name": "Get All Drivers",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{baseUrl}}/get-all-drivers?page=1&limit=10",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"get-all-drivers"
							],
							"query": [
								{
									"key": "page",
									"value": "1"
								},
								{
									"key": "limit",
									"value": "10"
								}
							]
						}
					}
				}
			]
		},
		{
			"name": "Routes Management",
			"item": [
				{
					"name": "Get All Routes",
					"request": {
						"method": "GET",
						"url": {
							"raw": "{{baseUrl}}/get-all-routes?page=1&limit=10",
							"host": [
								"{{baseUrl}}"
							],
							"path": [
								"get-all-routes"
							],
							"query": [
								{
									"key": "page",
									"value": "1"
								},
								{
									"key": "limit",
									"value": "10"
								}
							]
						}
					}
				}
			]
		}
	],
	"event": [
		{
			"listen": "prerequest",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		},
		{
			"listen": "test",
			"script": {
				"type": "text/javascript",
				"exec": [
					""
				]
			}
		}
	],
	"variable": [
		{
			"key": "baseUrl",
			"value": "http://localhost:3001",
			"type": "string"
		}
	]
}
```

---

## 📝 How to Export Postman Collection to a Word File

1.  **Publish Documentation in Postman**:
    - Select this imported collection in Postman.
    - Click **Share** (or the **...** options icon next to it) and select **Publish Docs**.
    - Configure styling and select **Publish**. This generates a public web link showing all endpoints.
2.  **Convert to Word Document**:
    - **Method A (No-Code)**: Open the published Postman link in your browser, select everything (`Ctrl + A`), copy it, and paste it into Microsoft Word. The styles and JSON code blocks will carry over.
    - **Method B (Markdown conversion)**: Export the collection as JSON from Postman, and run `npx postman-to-markdown -f your_collection.json -o api_docs.md`. Then open the generated `.md` file in Word or use an online tool like [PanDoc](https://pandoc.org) to convert Markdown to Word:
      ```bash
      pandoc api_docs.md -o API_Documentation.docx
      ```
