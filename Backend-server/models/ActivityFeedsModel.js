const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activityFeedSchema = new Schema({
    route_id: { type: String, required: true },
    status: { type: String, required: true },
    driver_id: { type: String },
    last_driver_id: { type: String },
    action_time: { type: Date, required: true, default: Date.now },
})

const ActivityFeeds = mongoose.model("ActivityFeeds", activityFeedSchema);

module.exports = ActivityFeeds;