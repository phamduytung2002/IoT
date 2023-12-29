// Example about Schema
// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const DeviceSchema = new Schema({
//     street: String,
//     postalCode: String,
//     city: String,
//     country: String
// });

// module.exports =  mongoose.model('device', DeviceSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  name: { type: String, unique: true },
  homeID: String,
  typeDevice: String,
  information: { temperature: String, humidity: String, openOrClose: String },
});

module.exports = mongoose.model("Device", DeviceSchema);
