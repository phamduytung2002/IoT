
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const DHT11Schema = new Schema({
    ID: String,
    temperature: String,
    humidity: String,
    time: String,
});
module.exports = mongoose.model('DHT11', DHT11Schema);