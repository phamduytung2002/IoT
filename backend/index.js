const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SERVER_PORT = 3000;

const DATABASE_URL = 'mongodb+srv://ducdm200158:e4kZPtLErHksXuqn@cluster0.xbcgsq9.mongodb.net/?retryWrites=true&w=majority';
const DATABASE_CONNECT_OPTION = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}; 

mongoose.connect(DATABASE_URL, DATABASE_CONNECT_OPTION);

mongoose.connection.on('connected', function()  {
    console.log('Connected to database');
});

mongoose.connection.on('disconnected', function()  {
    console.log('Can not connect to database');
});

var DHT11Schema = new mongoose.Schema({
    temperature: { type: Number },
    humidity: { type: Number },
    date: { type: Date, default: Date.now },
});
var IDSchema = new mongoose.Schema({
    id: { type: Number },
});


var DHT11 = mongoose.model('DHT11', DHT11Schema);
var ID = mongoose.model('ID', IDSchema);


app.get("/test", function (request, response) {
    console.log("Received 'test' request");
    response.status(200).json({ "message": "Success" });
});

app.post("/dht11",async  function (request, response) {
    console.log("Received 'create dht11 data' request");
    var newdht11 = new DHT11({
        temperature: request.query.temperature,
        humidity: request.query.humidity
    });

    try {
        await newdht11.save();
        console.log("Saved new dht11 data");
        response.status(200).json({ "message": "Success" });
    } catch (err) {
        console.log("Error when saving new dht11 data:", err);
        response.status(500).json({ message: "Error" });
    }
});
app.post("/id", async function (request, response) {
    console.log("Received 'create id data' request");
    var newid = new ID({
        id: request.query.id,
    });

    try {
        await newid.save();
        console.log("Saved new id data");
        response.status(200).json({ "message": "Success" });
    } catch (err) {
        console.log("Error when saving new id data:", err);
        response.status(500).json({ message: "Error" });
    }
});
app.get("/dht11", async function (request, response) {
    console.log("Received 'get dht11 data' request");
    
    try {
        const result = await DHT11.find({}).exec();
        response.status(200).json(result);
    } catch (err) {
        console.error('Error when getting data:', err);
        response.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/id", async function (request, response) {
    console.log("Received 'get id data' request");
    
    try {
        const result = await ID.find({}).exec();
        response.status(200).json(result);
    } catch (err) {
        console.error('Error when getting data:', err);
        response.status(500).json({ message: "Internal Server Error" });
    }
});
app.delete("/id/:id", async function (request, response) {
    console.log("Received 'delete id data' request");
    const idToDelete = request.params.id;

    try {
        const deletedItem = await ID.findOneAndDelete({ id: idToDelete }).exec();

        if (!deletedItem) {
            response.status(404).json({ message: "ID not found" });
            return;
        }

        console.log("Deleted id data:", deletedItem);
        response.status(200).json({ message: "Success", deletedItem });
    } catch (err) {
        console.error('Error when deleting data:', err);
        response.status(500).json({ message: "Internal Server Error" });
    }
});
app.listen(SERVER_PORT, function () {
    console.log("Server is running at " + SERVER_PORT);
});
