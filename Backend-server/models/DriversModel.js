const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const driverSchema = new Schema({
    driver_id: { type: String, unique: true, required: true }, // Custom ID: DR00, DR001, DR002, etc.
    name: { type: String, required: true },
    picture: { type: String }, // optional
    phone: { type: String, required: true },
    address: { type: String }, // optional
    country: { type: String }, // optional
    city: { type: String }, // optional
    contact_channels: { type: Object }, // optional => email, facebook, whatsapp, linkedin
    status: { type: String, required: true },
    national_id: { type: String, required: true },
    gender: { type: String, required: true },
    date_of_birth: { type: Date, required: true }, // Format: YYYY-MM-DD
    driving_license: { type: Object, required: true }, // type, number, expiration, image
    vehicle: { type: Object, required: true }, // type, make, model, year, color
    assignedRoute_id: { type: String }, // optional
    pastAssignedRoutes: {
        type: [
            {
                route_id: { type: String },
                startLocation: { type: String },
                endLocation: { type: String },
                assigned_at: { type: Date },
                unassigned_at: { type: Date },
            },
        ],
        default: [],
    }, // optional => route_id, startLocation, endLocation, assigned_at, unassigned_at
    notes: { type: String }, // optional
    joined_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Drivers = mongoose.model("Drivers", driverSchema);

module.exports = Drivers;
