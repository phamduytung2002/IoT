const UserAuth = require("./middlewares/auth");
const DeviceService = require("../services/device-service")
const Device = require("../database/models/Device");
const DHT11 = require("../database/models/DHT11");
const WaterSensor = require("../database/models/WaterSensor");
const Relay = require("../database/models/Relay.js");
const RFID = require("../database/models/RFID");
const express = require('express');

const app = express();

module.exports = (app) => {
    const service = new DeviceService();
    // api test
    app.get("/test", function (request, response) {
        console.log("Received 'test' request");
        response.status(200).json({ "message": "Success" });
    });
        //api GET
    //api get all device
    app.get("/device/getalldevice", async function (request, response) {
        console.log("Received 'get all device' request");

        try {
            const result = await Device.find({}).exec();
            response.status(200).json(result);
        } catch (err) {
            console.error('Error when getting data:', err);
            response.status(500).json({ message: "Internal Server Error" });
        }
    }
    );
    //api get device by ID
    app.get("/device/getdevicebyid", async function (request, response) {
        console.log("Received 'get device by ID' request");
        const { ID } = request.query;
        try {
            const result = await Device.find({ ID }).exec();
            console.log(result);
            response.status(200).json(result);
        } catch (err) {
            console.error('Error when getting data:', err);
            response.status(500).json({ message: "Internal Server Error" });
        }
    }
    );
    //api get device by Name
    app.get("/device/getdevicebyname", async function (request, response) {
        console.log("Received 'get device by Name' request");
        const { Name } = request.query;
        try {
            const result = await Device.find({ Name }).exec();
            console.log(result);
            response.status(200).json(result);
        } catch (err) {
            console.error('Error when getting data:', err);
            response.status(500).json({ message: "Internal Server Error" });
        }   
    }
    );
    //api get device by Type
    app.get("/device/getdevicebytype", async function (request, response) {
        console.log("Received 'get device by Type' request");
        const { Type } = request.query;
        try {
            const result = await Device.find({ Type }).exec();
            console.log(result);
            response.status(200).json(result);
        } catch (err) {
            console.error('Error when getting data:', err);
            response.status(500).json({ message: "Internal Server Error" });
        }
    }
    );
    //api get device by ID_home
    app.get("/device/getdevicebyidhome", async function (request, response) {
        console.log("Received 'get device by ID_home' request");
        const { ID_home } = request.query;
        try {
            const result = await Device.find({ ID_home }).exec();
            console.log(result);
            response.status(200).json(result);
        } catch (err) {
            console.error('Error when getting data:', err);
            response.status(500).json({ message: "Internal Server Error" });
        }
    }
    );
    //api get device by Status
    app.get("/device/getdevicebystatus", async function (request, response) {
        console.log("Received 'get device by Status' request");
        const { Status } = request.query;
        try {
            const result = await Device.find({ Status }).exec();
            console.log(result);
            response.status(200).json(result);
        } catch (err) {
            console.error('Error when getting data:', err);
            response.status(500).json({ message: "Internal Server Error" });
        }
    }
    );
     

    
        //api POST
    // api add device
    app.post("/device/createdevice", async (req, res) => {
    console.log("Received 'create a new device' request");
    const { ID, Name, Description, Type, ID_home, Status, Value } = req.query;

    // Create a new device instance
    const newdevice = new Device({
        ID,
        Name,
        Description,
        Type,
        ID_home,
        Status,
        Value,
    });
        try {
            await newdevice.save();
            console.log("Saved new device data");
            res.status(200).json({ "message": "Success" });
        } catch (err) {
            console.log("Error when saving new device data:", err);
            res.status(500).json({ "message": "Error" });
        }
    });
    //api post dht11 data
    app.post("/device/dht11", async function (request, response) {
        console.log("Received 'create dht11 data' request");
        const { ID, temperature, humidity, time } = request.query;
        var newdht11 = new DHT11({
            ID,
            temperature,
            humidity,
            time,
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
    //api post water sensor data
    app.post("/device/watersensor", async function (request, response) {
        console.log("Received 'create water sensor data' request");
        const { ID, waterLevel, time } = request.query;
        var newwatersensor = new WaterSensor({
            ID,
            waterLevel,
            time,
        });
        try {
            await newwatersensor.save();
            console.log("Saved new water sensor data");
            response.status(200).json({ "message": "Success" });
        } catch (err) {
            console.log("Error when saving new water sensor data:", err);
            response.status(500).json({ message: "Error" });
        }
    });
    //api post relay data
    app.post("/device/relay", async function (request, response) {
        console.log("Received 'create relay data' request");
        const { ID, status, time } = request.query;
        var newrelay = new Relay({
            ID,
            status,
            time,
        });
        try {
            await newrelay.save();
            console.log("Saved new relay data");
            response.status(200).json({ "message": "Success" });
        } catch (err) {
            console.log("Error when saving new relay data:", err);
            response.status(500).json({ message: "Error" });
        }
    });
    //api post rfid data
    app.post("/device/rfid", async function (request, response) {
        console.log("Received 'create rfid data' request");
        const { ID, status, time } = request.query;
        var newrfid = new RFID({
            ID,
            status,
            time,
        });
        try {
            await newrfid.save();
            console.log("Saved new rfid data");
            response.status(200).json({ "message": "Success" });
        } catch (err) {
            console.log("Error when saving new rfid data:", err);
            response.status(500).json({ message: "Error" });
        }
    });

    //api PUT
    //api update device by ID
    app.put("/device/updatedevicebyid", async function (request, response) {
        console.log("Received 'update device by ID' request");
        const { ID, Name, Description, Type, ID_home, Status, Value } = request.query;
        try {
            const result = await Device.updateOne({ ID }, { Name, Description, Type, ID_home, Status, Value }).exec();
            console.log(result);
            response.status(200).json(result);
        } catch (err) {
            console.error('Error when updating data:', err);
            response.status(500).json({ message: "Internal Server Error" });
        }
    }
    );
    //api DELETE
    //api delete device by ID
    app.delete("/device/deletedevicebyid", async function (request, response) {
        console.log("Received 'delete device by ID' request");
        const { ID } = request.query;
        try {
            const result = await Device.deleteOne({ ID }).exec();
            console.log(result);
            response.status(200).json(result);
        } catch (err) {
            console.error('Error when deleting data:', err);
            response.status(500).json({ message: "Internal Server Error" });
        }
    }
    );  

    
};

    // Example about api create device ( route ) with no authentic
    // app.post("/device/create", async (req, res, next) => {
    //     const { name, desc, type, unit, price, available, suplier, banner } =
    //       req.body;
    //     // validation
    //     const { data } = await service.CreateDevice({
    //       name,
    //       desc,
    //       type,
    //       unit,
    //       price,
    //       available,
    //       suplier,
    //       banner,
    //     });
    //     return res.json(data);
    //   });
//   ----------------------------------------------------------------------
    // Example about api create device ( route ) with AUTHENTIC
    // app.post("/device/create", UserAuth,  async (req, res, next) => {
    //     const { name, desc, type, unit, price, available, suplier, banner } =
    //       req.body;
    //     // validation
    //     const { data } = await service.CreateDevice({
    //       name,
    //       desc,
    //       type,
    //       unit,
    //       price,
    //       available,
    //       suplier,
    //       banner,
    //     });
    //     return res.json(data);
    //   });
    // ------------------------------------------
    // Not use
    // // PublishCustomerEvent(data);
    // PublishMessage(channel, CUSTOMER_SERVICE, JSON.stringify(data));
