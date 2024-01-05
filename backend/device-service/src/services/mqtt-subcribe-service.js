const FROM_DEVICE = "team_tung_bien_manh_duc_from_device";
const TO_DEVICE = "team_tung_bien_manh_duc_to_device";
const HOST = "broker.hivemq.com";
const MQTTPORT = 1883;
const MQTTPROTOCOL = "mqtt";

const mqtt = require("mqtt");
const DeviceRepository = require("../database/repository/device-repository");
const repo = new DeviceRepository();
function subscribe() {
  const broker = MQTTPROTOCOL + "://" + HOST;
  // initialize the MQTT client
  const client = mqtt.connect(broker, { MQTTPORT });

  // setup the callbacks
  client.on("connect", () => {
    console.log("Connected to MQTT Broker!");
    client.subscribe(FROM_DEVICE, (err) => {
      if (!err) {
        console.log(`Subscribe to ${FROM_DEVICE} success`);
      }
    });

    client.on("message", (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
      var obj = JSON.parse(message);
      console.log(obj);
      repo.UpdateDevice(obj);
    });
  });

  client.on("error", function (error) {
    console.log(error);
  });
}
// subscribe();

module.exports = subscribe; 
