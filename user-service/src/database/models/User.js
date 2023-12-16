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

// user schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    listHome: Array,
});

module.exports =  mongoose.model('user', UserSchema);
