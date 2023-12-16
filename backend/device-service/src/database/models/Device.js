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


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    ID: String,
    Name: String,
    Description: String,
    Type: String,
    ID_home: String,
    Status: String,
    Value: String,
});


module.exports = mongoose.model('Device', DeviceSchema);

