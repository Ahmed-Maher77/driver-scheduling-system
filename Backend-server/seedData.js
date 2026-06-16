require("dotenv").config();
const mongoose = require("mongoose");
const Drivers = require("./models/DriversModel");
const Routes = require("./models/RoutesModel");
const ActivityFeeds = require("./models/ActivityFeedsModel");

const DATABASE_URL = process.env.DATABASE_URL;

// Helper to generate random dates within a range
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

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

// Realistic Driver Names
const firstNames = ["James", "Robert", "John", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles", "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Ahmed", "Omar", "Ali", "Fatima", "Aisha", "Wei", "Chen", "Li", "Diego", "Mateo"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"];

const seedDatabase = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("Connected to MongoDB");

        await Drivers.deleteMany({});
        await Routes.deleteMany({});
        await ActivityFeeds.deleteMany({});
        console.log("Cleared existing data");

        const drivers = [];
        const routes = [];
        const activities = [];

        // 1. Generate 25 Realistic Drivers
        for (let i = 1; i <= 25; i++) {
            const fName = randomItem(firstNames);
            const lName = randomItem(lastNames);
            const gender = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Fatima", "Aisha"].includes(fName) ? "Female" : "Male";
            const idNumber = String(Math.floor(100000000 + Math.random() * 900000000));
            const phoneNumber = `+1 (${Math.floor(200 + Math.random() * 800)}) ${Math.floor(200 + Math.random() * 800)}-${Math.floor(1000 + Math.random() * 9000)}`;
            const joinedDate = randomDate(new Date(2021, 0, 1), new Date());
            
            drivers.push({
                driver_id: `DR${String(i).padStart(3, '0')}`,
                name: `${fName} ${lName}`,
                picture: `https://i.pravatar.cc/150?u=${fName}${lName}${i}`,
                phone: phoneNumber,
                address: `${Math.floor(100 + Math.random() * 8999)} ${randomItem(["Maple", "Oak", "Pine", "Cedar", "Elm", "Washington", "Lake", "Hill"])} ${randomItem(["St", "Ave", "Blvd", "Rd", "Ln"])}`,
                country: "USA",
                city: randomItem(["Los Angeles", "New York", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle", "Denver", "Washington"]),
                contact_channels: {
                    email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@logistics.com`,
                    facebook: `facebook.com/${fName.toLowerCase()}${lName.toLowerCase()}`,
                    whatsapp: phoneNumber,
                    linkedin: `linkedin.com/in/${fName.toLowerCase()}-${lName.toLowerCase()}-${i}`
                },
                status: Math.random() > 0.15 ? "active" : (Math.random() > 0.5 ? "on leave" : "inactive"),
                national_id: `NID-${idNumber}`,
                gender: gender,
                date_of_birth: randomDate(new Date(1965, 0, 1), new Date(1998, 0, 1)),
                driving_license: { 
                    type: randomItem(["Commercial Class A", "Commercial Class B", "Standard"]), 
                    number: `DL-${Math.floor(10000000 + Math.random() * 90000000)}`, 
                    expiration: randomDate(new Date(2025, 0, 1), new Date(2032, 11, 31)), 
                    image: `https://fakeimg.pl/400x250/cccccc/909090?text=License+${fName}+${lName}` 
                },
                vehicle: { 
                    type: randomItem(["Semi-Truck", "Box Truck", "Cargo Van", "Flatbed", "Refrigerated Truck"]), 
                    make: randomItem(["Freightliner", "Peterbilt", "Kenworth", "Volvo", "Mack", "Ford", "Mercedes-Benz", "Ram"]), 
                    model: randomItem(["Cascadia", "579", "T680", "VNL", "Anthem", "Transit", "Sprinter", "ProMaster"]), 
                    year: Math.floor(2015 + Math.random() * 9), 
                    color: randomItem(["White", "Silver", "Black", "Blue", "Red", "Yellow", "Green"]) 
                },
                pastAssignedRoutes: [],
                notes: randomItem([
                    "Excellent safety record. Over 500k miles driven without incident.",
                    "Prefers long-haul interstate routes.",
                    "Available for weekend shifts. Specializes in refrigerated cargo.",
                    "Has endorsements for hazardous materials (HazMat).",
                    "Reliable driver, always on time for deliveries.",
                    "Requires 48 hours notice for schedule changes.",
                    "Top performer in fuel efficiency program for Q3 2025.",
                    "", "", "" // Sometimes no notes
                ]),
                joined_at: joinedDate,
                updated_at: new Date()
            });
        }

        // 2. Generate 40 Realistic Routes
        const routeStatuses = ["unassigned", "assigned", "in progress", "completed", "cancelled"];
        
        for (let i = 1; i <= 40; i++) {
            // Determine status based on probabilities (more completed and in progress for realism)
            const randStatus = Math.random();
            let status = "unassigned";
            if (randStatus > 0.1) status = "assigned";
            if (randStatus > 0.4) status = "in progress";
            if (randStatus > 0.7) status = "completed";
            if (randStatus > 0.95) status = "cancelled";

            let startLoc = randomItem(locations);
            let endLoc = randomItem(locations);
            while (startLoc === endLoc) endLoc = randomItem(locations);

            const distanceMiles = Math.floor(50 + Math.random() * 1200);
            // Average speed 55mph -> duration in minutes
            const durationMins = Math.floor((distanceMiles / 55) * 60) + Math.floor(Math.random() * 60); 
            const costUsd = parseFloat((distanceMiles * 1.85 + Math.random() * 100).toFixed(2));
            
            const routeCreatedDate = randomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()); // past 30 days
            
            let assignedDriver = null;
            let assignedDate = null;
            
            if (status !== "unassigned") {
                const availableDrivers = drivers.filter(d => d.status === "active");
                if(availableDrivers.length > 0) {
                    assignedDriver = randomItem(availableDrivers);
                    assignedDate = new Date(routeCreatedDate.getTime() + Math.random() * 86400000); // assigned within 1 day of creation
                } else {
                    status = "unassigned";
                }
            }

            const route = {
                route_id: `RT${String(i).padStart(3, '0')}`,
                start_location: startLoc,
                end_location: endLoc,
                status: status,
                distance: distanceMiles,
                distance_unit: "miles",
                duration: durationMins,
                time_unit: "minutes",
                cost: costUsd,
                currency: "USD",
                max_speed: randomItem([65, 70, 75]),
                speed_unit: "mph",
                notes: randomItem([
                    "Fragile cargo. Ensure secure load restraints.",
                    "Client requires delivery before 5 PM.",
                    "High priority shipment. Expedited routing required.",
                    "Requires refrigerated transport set to 34°F.",
                    "Standard logistics run.",
                    "Watch out for heavy traffic near the destination hub.",
                    "Gate code for destination is 4829#",
                    "Requires signature from warehouse manager.",
                    "", ""
                ]),
                created_at: routeCreatedDate,
                updated_at: new Date()
            };

            if (assignedDriver) {
                if (status === "completed" || status === "cancelled") {
                    route.lastDriver_id = assignedDriver.driver_id;
                    
                    // Add to driver's past routes
                    assignedDriver.pastAssignedRoutes.push({
                        route_id: route.route_id,
                        startLocation: route.start_location,
                        endLocation: route.end_location,
                        assigned_at: assignedDate,
                        unassigned_at: new Date(assignedDate.getTime() + durationMins * 60000)
                    });
                } else {
                    route.assignedDriver_id = assignedDriver.driver_id;
                    route.assigned_at = assignedDate;
                    
                    // Update driver's current route
                    assignedDriver.assignedRoute_id = route.route_id;
                }

                // Generate Activity Feeds based on status evolution
                activities.push({
                    route_id: route.route_id,
                    status: "assigned",
                    driver: { id: assignedDriver.driver_id, name: assignedDriver.name },
                    driver_id: assignedDriver.driver_id,
                    action_time: assignedDate
                });

                if (status === "in progress" || status === "completed") {
                    const inProgressDate = new Date(assignedDate.getTime() + Math.random() * 3600000); // 1 hr after assignment
                    activities.push({
                        route_id: route.route_id,
                        status: "in progress",
                        driver: { id: assignedDriver.driver_id, name: assignedDriver.name },
                        driver_id: assignedDriver.driver_id,
                        action_time: inProgressDate
                    });
                }

                if (status === "completed") {
                    const completedDate = new Date(assignedDate.getTime() + durationMins * 60000);
                    activities.push({
                        route_id: route.route_id,
                        status: "completed",
                        last_driver: { id: assignedDriver.driver_id, name: assignedDriver.name },
                        last_driver_id: assignedDriver.driver_id,
                        action_time: completedDate
                    });
                }
                
                if (status === "cancelled") {
                    const cancelledDate = new Date(assignedDate.getTime() + Math.random() * 86400000);
                    activities.push({
                        route_id: route.route_id,
                        status: "cancelled",
                        last_driver: { id: assignedDriver.driver_id, name: assignedDriver.name },
                        last_driver_id: assignedDriver.driver_id,
                        action_time: cancelledDate
                    });
                }
            } else {
                activities.push({
                    route_id: route.route_id,
                    status: "unassigned",
                    action_time: routeCreatedDate
                });
            }

            routes.push(route);
        }

        // Add some manual re-assignments for realistic activity feed history
        const testRoute = routes.find(r => r.status === "in progress");
        if(testRoute && testRoute.assignedDriver_id) {
            const originalDriver = drivers.find(d => d.driver_id === testRoute.assignedDriver_id);
            const otherActiveDrivers = drivers.filter(d => d.status === "active" && !d.assignedRoute_id && d.driver_id !== testRoute.assignedDriver_id);
            
            if(originalDriver && otherActiveDrivers.length > 0) {
                const newDriver = otherActiveDrivers[0];
                
                // Unassign original
                activities.push({
                    route_id: testRoute.route_id,
                    status: "unassigned",
                    last_driver: { id: originalDriver.driver_id, name: originalDriver.name },
                    last_driver_id: originalDriver.driver_id,
                    action_time: new Date(Date.now() - 7200000)
                });
                
                // Reassign to new
                activities.push({
                    route_id: testRoute.route_id,
                    status: "assigned",
                    driver: { id: newDriver.driver_id, name: newDriver.name },
                    driver_id: newDriver.driver_id,
                    action_time: new Date(Date.now() - 3600000)
                });
                
                // In progress
                activities.push({
                    route_id: testRoute.route_id,
                    status: "in progress",
                    driver: { id: newDriver.driver_id, name: newDriver.name },
                    driver_id: newDriver.driver_id,
                    action_time: new Date(Date.now() - 1800000)
                });
                
                // Fix assignments
                originalDriver.assignedRoute_id = null;
                originalDriver.pastAssignedRoutes.push({
                    route_id: testRoute.route_id,
                    startLocation: testRoute.start_location,
                    endLocation: testRoute.end_location,
                    assigned_at: new Date(Date.now() - 86400000),
                    unassigned_at: new Date(Date.now() - 7200000)
                });
                
                newDriver.assignedRoute_id = testRoute.route_id;
                testRoute.assignedDriver_id = newDriver.driver_id;
            }
        }

        // Sort activities chronologically just in case
        activities.sort((a, b) => a.action_time - b.action_time);

        await Drivers.insertMany(drivers);
        console.log(`Inserted ${drivers.length} comprehensive drivers`);

        await Routes.insertMany(routes);
        console.log(`Inserted ${routes.length} highly detailed routes`);

        await ActivityFeeds.insertMany(activities);
        console.log(`Inserted ${activities.length} interconnected activity feed events`);

        console.log("-----------------------------------------");
        console.log("Database seeded successfully with HIGH QUALITY REALISTIC data!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDatabase();
