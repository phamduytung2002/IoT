const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RelaySchema = new Schema({
    ID: String,
    status: String,
    time: String,
});
module.exports = mongoose.model('Relay', RelaySchema);