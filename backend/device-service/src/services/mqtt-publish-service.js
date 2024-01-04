const FROM_DEVICE = "team_tung_bien_manh_duc_from_device";
const TO_DEVICE = "team_tung_bien_manh_duc_to_device";
const HOST = "broker.hivemq.com";
const MQTTPORT = 1883;
const MQTTPROTOCOL = "mqtt";

const mqtt = require("mqtt");

// function publish() {
//   const broker = MQTTPROTOCOL + "://" + HOST;
//   // initialize the MQTT client
//   const client = mqtt.connect(broker, { MQTTPORT });

//   // setup the callbacks
//   client.on("connect", () => {
//     console.log("Connected to MQTT Broker!");
//     for (let i = 0; i < 5; i++) {
//       const message = `Message ${i + 1}`;
//       client.publish(TO_DEVICE, JSON.stringify(message));
//       console.log(`Published: ${message}`);
//     }

//     // Close the client after publishing 5 messages
//     client.end();
//   });

//   client.on("error", function (error) {
//     console.log(error);
//   });
// }

function publish(message) {
  const broker = MQTTPROTOCOL + "://" + HOST;
  // initialize the MQTT client
  const client = mqtt.connect(broker, { MQTTPORT });

  // setup the callbacks
  client.on("connect", () => {
    console.log("Connected to MQTT Broker!");
    client.publish(TO_DEVICE, JSON.stringify(message));
    console.log(`Published: ${message}`);

    // Close the client after publishing 5 messages
    client.end();
  });

  client.on("error", function (error) {
    console.log(error);
  });
}

publish({"testing_key":"testing_value"});

module.exports = {publish}