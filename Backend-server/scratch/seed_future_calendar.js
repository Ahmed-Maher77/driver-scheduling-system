const mongoose = require('mongoose');
const Drivers = require('../models/DriversModel');
const Routes = require('../models/RoutesModel');
const ActivityFeeds = require('../models/ActivityFeedsModel');

// Helper to get random item from array
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Realistic US Cities and Hubs
const locations = [
    "Port of Los Angeles, CA", "JFK Airport Cargo, NY", "Atlanta Logistics Hub, GA", "O'Hare Freight Center, IL",
    "Dallas/Fort Worth Hub, TX", "Port of Newark, NJ", "Miami Free Zone, FL", "Seattle Distribution Center, WA",
    "Denver Cross-Dock Facility, CO", "Houston Port Terminal, TX", "Memphis FedEx Hub, TN", "Louisville UPS Worldport, KY",
    "Phoenix Desert Hub, AZ", "Las Vegas Logistics Center, NV", "Salt Lake City Depot, UT", "Portland Freight Terminal, OR",
    "Boston Harbor Distribution, MA", "Detroit Auto-Parts Depot, MI", "Charlotte Fulfillment Center, NC", "Orlando Fulfillment Center, FL"
];

// Typical notes
const notesOptions = [
    "Fragile cargo. Ensure secure load restraints.",
    "Client requires delivery before 5 PM.",
    "High priority shipment. Expedited routing required.",
    "Requires refrigerated transport set to 34°F.",
    "Standard logistics run.",
    "Watch out for heavy traffic near the destination hub.",
    "Gate code for destination is 4829#",
    "Requires signature from warehouse manager.",
    "", ""
];

async function seedFutureCalendar() {
    try {
        console.log("Connecting to MongoDB Atlas...");
        await mongoose.connect('mongodb://ahmedmaheraljwhry057_db_user:EzhpHAIMjqxv6tyu@ac-f9ijsnb-shard-00-00.y86gbpb.mongodb.net:27017,ac-f9ijsnb-shard-00-01.y86gbpb.mongodb.net:27017,ac-f9ijsnb-shard-00-02.y86gbpb.mongodb.net:27017/main_db?ssl=true&replicaSet=atlas-l8ghp3-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected successfully.");

        // Get all active drivers to assign routes
        const activeDrivers = await Drivers.find({ status: "active" });
        if (activeDrivers.length === 0) {
            console.error("Error: No active drivers found in database. Cannot assign future routes.");
            process.exit(1);
        }
        console.log(`Found ${activeDrivers.length} active drivers to distribute routes.`);

        // Find the maximum route_id number currently in DB
        const allRoutes = await Routes.find({}, { route_id: 1 });
        let maxRouteNum = 0;
        allRoutes.forEach(r => {
            const match = r.route_id.match(/^RT(\d+)$/);
            if (match) {
                const num = parseInt(match[1], 10);
                if (num > maxRouteNum) maxRouteNum = num;
            }
        });
        console.log(`Current maximum Route ID number in DB: ${maxRouteNum}`);

        const newRoutes = [];
        const newActivities = [];
        let nextRouteIdNum = maxRouteNum + 1;

        // Current time: 2026-06-16T21:16:20+03:00 (June 2026)
        // We start from June 2026 (month index 5, 0-based) until December 2028 (month index 11, year 2028)
        const startYear = 2026;
        const startMonth = 5; // June (0-based)
        const endYear = 2028;
        const endMonth = 11; // December (0-based)

        for (let year = startYear; year <= endYear; year++) {
            const firstMonthInYear = (year === startYear) ? startMonth : 0;
            const lastMonthInYear = (year === endYear) ? endMonth : 11;

            for (let month = firstMonthInYear; month <= lastMonthInYear; month++) {
                // Determine number of things to appear in the calendar: 3 or 4
                const itemsCount = Math.random() > 0.5 ? 4 : 3;
                console.log(`Generating ${itemsCount} routes for ${year}-${String(month + 1).padStart(2, '0')}...`);

                // Generate random distinct days in the month
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const selectedDays = [];
                
                while (selectedDays.length < itemsCount) {
                    let day;
                    if (year === 2026 && month === 5) {
                        // For June 2026, select only future days (after June 16)
                        day = Math.floor(17 + Math.random() * (daysInMonth - 16));
                    } else {
                        day = Math.floor(1 + Math.random() * daysInMonth);
                    }
                    if (!selectedDays.includes(day)) {
                        selectedDays.push(day);
                    }
                }
                
                // Sort days chronologically
                selectedDays.sort((a, b) => a - b);

                for (const day of selectedDays) {
                    const assignedDate = new Date(year, month, day, Math.floor(8 + Math.random() * 10), Math.floor(Math.random() * 60)); // Random hour between 08:00 and 17:00
                    const createdDate = new Date(assignedDate.getTime() - (1 + Math.floor(Math.random() * 3)) * 24 * 60 * 60 * 1000); // 1-3 days before assignment

                    const routeId = `RT${String(nextRouteIdNum).padStart(3, '0')}`;
                    nextRouteIdNum++;

                    let startLoc = randomItem(locations);
                    let endLoc = randomItem(locations);
                    while (startLoc === endLoc) endLoc = randomItem(locations);

                    const distanceMiles = Math.floor(50 + Math.random() * 1200);
                    const durationMins = Math.floor((distanceMiles / 55) * 60) + Math.floor(Math.random() * 60); 
                    const costUsd = parseFloat((distanceMiles * 1.85 + Math.random() * 100).toFixed(2));

                    const assignedDriver = randomItem(activeDrivers);

                    const routeData = {
                        route_id: routeId,
                        start_location: startLoc,
                        end_location: endLoc,
                        status: "assigned",
                        distance: distanceMiles,
                        distance_unit: "miles",
                        duration: durationMins,
                        time_unit: "minutes",
                        cost: costUsd,
                        currency: "USD",
                        max_speed: randomItem([65, 70, 75]),
                        speed_unit: "mph",
                        notes: randomItem(notesOptions),
                        created_at: createdDate,
                        updated_at: new Date(),
                        assigned_at: assignedDate,
                        assignedDriver_id: assignedDriver.driver_id
                    };

                    newRoutes.push(routeData);

                    // Create Activity Feed entry
                    newActivities.push({
                        route_id: routeId,
                        status: "assigned",
                        driver: { id: assignedDriver.driver_id, name: assignedDriver.name },
                        driver_id: assignedDriver.driver_id,
                        action_time: assignedDate
                    });
                }
            }
        }

        console.log(`Generated a total of ${newRoutes.length} new routes and activity entries.`);
        
        // Insert routes and activities in bulk
        if (newRoutes.length > 0) {
            await Routes.insertMany(newRoutes);
            await ActivityFeeds.insertMany(newActivities);
            console.log("Database successfully populated with future calendar data!");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error seeding future calendar:", error);
        process.exit(1);
    }
}

seedFutureCalendar();
