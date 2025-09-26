const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activityFeedSchema = new Schema({
    route_id: { type: String, required: true },
    status: { type: String, required: true },
    driver: { id: String, name: String },
    last_driver: { id: String, name: String },
    driver_id: { type: String }, // Legacy field for backward compatibility
    last_driver_id: { type: String }, // Legacy field for backward compatibility
    action_time: { type: Date, required: true, default: Date.now },
});

const ActivityFeeds = mongoose.model("ActivityFeeds", activityFeedSchema);

module.exports = ActivityFeeds;
