const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const WaterSensorSchema = new Schema({
    ID: String,
    waterLevel: String,
    time: String,
});
module.exports = mongoose.model('WaterSensor', WaterSensorSchema);