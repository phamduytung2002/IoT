const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RFIDSchema = new Schema({
    ID: String,
    status: String,
    time: String,
});
module.exports = mongoose.model('RFID', RFIDSchema);