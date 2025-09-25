const Drivers = require("../models/DriversModel");

// Generates the next available driver ID in the format DR00, DR001, DR002, etc.
const generateDriverId = async () => {
    try {
        // Find the highest existing driver ID
        const lastDriver = await Drivers.findOne(
            {},
            {},
            { sort: { driver_id: -1 } }
        );

        if (!lastDriver) {
            // If no drivers exist, start with DR00
            return "DR00";
        }

        // Extract the number from the last driver ID
        const lastId = lastDriver.driver_id;
        const match = lastId.match(/^DR(\d+)$/);

        if (!match) {
            // If the last ID doesn't match expected format, start fresh
            return "DR00";
        }

        // Get the number part and increment it
        const lastNumber = parseInt(match[1], 10);
        const nextNumber = lastNumber + 1;

        // Format the number with leading zeros (minimum 2 digits)
        const formattedNumber = nextNumber.toString().padStart(2, "0");

        return `DR${formattedNumber}`;
    } catch (error) {
        console.error("Error generating driver ID:", error);
        // Fallback: return a timestamp-based ID if database query fails
        const timestamp = Date.now().toString().slice(-6);
        return `DR${timestamp}`;
    }
};

module.exports = generateDriverId;
