const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const routeSchema = new Schema({
    route_id: { type: String, unique: true, required: true }, // Custom ID: RT00, RT001, RT002, etc.
    start_location: { type: String, required: true },
    end_location: { type: String, required: true },
    status: { type: String, required: true },
    assignedDriver_id: { type: String }, // optional
    lastDriver_id: { type: String }, // optional
    distance: { type: Number, required: true },
    distance_unit: { type: String, required: true },
    duration: { type: Number, required: true },
    time_unit: { type: String, required: true },
    cost: { type: Number, required: true },
    currency: { type: String, required: true },
    max_speed: { type: Number, required: true },
    speed_unit: { type: String, required: true },
    notes: { type: String }, // optional
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    assigned_at: { type: Date }, // optional
});

const Routes = mongoose.model("Routes", routeSchema);

module.exports = Routes;
