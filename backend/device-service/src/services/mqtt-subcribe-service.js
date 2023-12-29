const TOPIC2 = "team_tung_bien_manh_duc_from_device";
const TOPIC1 = "team_tung_bien_manh_duc_to_device";
const HOST = "broker.hivemq.com";
const MQTTPORT = 1883;
const MQTTPROTOCOL = "mqtt";

const mqtt = require("mqtt");

function subscribe() {
  const broker = MQTTPROTOCOL + "://" + HOST;
  // initialize the MQTT client
  const client = mqtt.connect(broker, { MQTTPORT });

  // setup the callbacks
  client.on("connect", () => {
    console.log("Connected to MQTT Broker!");
    client.subscribe(TOPIC1, (err) => {
      if (!err) {
        console.log(`Subscribe to ${TOPIC1} success`);
      }
    });

    client.on("message", (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);
    });
  });

  client.on("error", function (error) {
    console.log(error);
  });
}
subscribe();
