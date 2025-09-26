const express = require("express");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 6060;

// Initialize Express (Server)
const app = express();

// Import routes
const AddNewRoute = require("./routes/AddNewRoute_Route");
const AddNewDriver = require("./routes/AddNewDriver_Route");
const GetActivityFeeds = require("./routes/GetActivityFeeds_Route");
const GetAllRoutes = require("./routes/GetAllRoutes_Route");
const GetAllDrivers = require("./routes/GetAllDrivers_Route");
const GetDriverDetails = require("./routes/GetDriverDetails_Route");
const GetRouteDetails = require("./routes/GetRouteDetails_Route");
const DeleteRoute = require("./routes/DeleteRoute_Route");
const DeleteDriver = require("./routes/DeleteDriver_Route");
const CheckRouteAvailability = require("./routes/CheckRouteAvailability_Route");
const CheckDriverAvailability = require("./routes/CheckDriverAvailability_Route");
const GetDashboardStats = require("./routes/GetDashboardStats_Route");
const GetAssignedRoutesByMonth = require("./routes/GetAssignedRoutesByMonth_Route");
const EditRoute = require("./routes/EditRoute_Route");
const EditDriver = require("./routes/EditDriver_Route");
const DeleteBulkRoutes = require("./routes/DeleteBulkRoutes_Route");
const DeleteBulkDrivers = require("./routes/DeleteBulkDrivers_Route");
const UploadImageOnServer = require("./routes/UploadImageOnServer_Route");

// utilities
const startServerWithDB = require("./utils/serverManager");

// ======================= Middlewares =======================
app.use(express.json()); // Parse JSON request bodies
app.use(express.static("views/staticFiles")); // Serve static files from views/staticFiles directory

// Serve uploaded images as static files
app.use("/uploads", express.static("uploads"));

// CORS middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

// ====================== Route Handlers ======================
// Home Page
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/homePage.html`);
});

// ========== Routes ==========
// Add New Route
app.use("/add-new-route", AddNewRoute);

// Add New Driver
app.use("/add-new-driver", AddNewDriver);

// Get All Routes
app.use("/get-all-routes", GetAllRoutes);

// Get Route Details
app.use("/get-route-details", GetRouteDetails);

// Edit Route
app.use("/edit-route", EditRoute);

// Delete Route
app.use("/delete-route", DeleteRoute);

// Delete Bulk Routes
app.use("/delete-bulk-routes", DeleteBulkRoutes);

// Check Route Availability
app.use("/check-route-availability", CheckRouteAvailability);

// Get Routes By Month
app.use("/get-assigned-routes-by-month", GetAssignedRoutesByMonth);

// ========== Drivers ==========
// Get All Drivers
app.use("/get-all-drivers", GetAllDrivers);

// Get Driver Details
app.use("/get-driver-details", GetDriverDetails);

// Edit Driver
app.use("/edit-driver", EditDriver);

// Delete Driver
app.use("/delete-driver", DeleteDriver);

// Delete Bulk Drivers
app.use("/delete-bulk-drivers", DeleteBulkDrivers);

// Check Driver Availability
app.use("/check-driver-availability", CheckDriverAvailability);

// Upload Image on Server
app.use("/upload-image-on-server", UploadImageOnServer);

// ========== Activity Feeds ==========
// Get Activity Feeds
app.use("/get-activity-feeds", GetActivityFeeds);

// ========== Dashboard Stats ==========
// Get Dashboard Stats
app.use("/get-dashboard-stats", GetDashboardStats);

// Not Found - catch all unmatched routes
app.use((req, res) => {
    res.status(404);
    res.sendFile(`${__dirname}/views/notFound.html`);
});

// Start the server with database connection
startServerWithDB(app, PORT);
