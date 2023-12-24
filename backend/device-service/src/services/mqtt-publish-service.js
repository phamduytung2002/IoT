const TOPIC2 = "team_tung_bien_manh_duc_from_device";
const TOPIC1 = "team_tung_bien_manh_duc_to_device";
const HOST = "broker.hivemq.com";
const MQTTPORT = 1883;
const MQTTPROTOCOL = "mqtt";

const mqtt = require("mqtt");

function publish() {
  const broker = MQTTPROTOCOL + "://" + HOST;
  // initialize the MQTT client
  const client = mqtt.connect(broker, { MQTTPORT });

  // setup the callbacks
  client.on("connect", () => {
    console.log("Connected to MQTT Broker!");
    for (let i = 0; i < 5; i++) {
      const message = `Message ${i + 1}`;
      client.publish(TOPIC1, JSON.stringify(message));
      console.log(`Published: ${message}`);
    }

    // Close the client after publishing 5 messages
    client.end();
  });

  client.on("error", function (error) {
    console.log(error);
  });
}
publish();
