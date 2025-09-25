const Routes = require("../models/RoutesModel");

// Generates the next available route ID in the format RT00, RT001, RT002, etc.
const generateRouteId = async () => {
    try {
        // Find the highest existing route ID
        const lastRoute = await Routes.findOne(
            {},
            {},
            { sort: { route_id: -1 } }
        );

        if (!lastRoute) {
            // If no routes exist, start with RT00
            return "RT00";
        }

        // Extract the number from the last route ID
        const lastId = lastRoute.route_id;
        const match = lastId.match(/^RT(\d+)$/);

        if (!match) {
            // If the last ID doesn't match expected format, start fresh
            return "RT00";
        }

        // Get the number part and increment it
        const lastNumber = parseInt(match[1], 10);
        const nextNumber = lastNumber + 1;

        // Format the number with leading zeros (minimum 2 digits)
        const formattedNumber = nextNumber.toString().padStart(2, "0");
        const newId = `RT${formattedNumber}`;

        return newId;
    } catch (error) {
        console.error("Error generating route ID:", error);
        // Fallback: return a timestamp-based ID if database query fails
        const timestamp = Date.now().toString().slice(-6);
        return `RT${timestamp}`;
    }
};

module.exports = generateRouteId;
