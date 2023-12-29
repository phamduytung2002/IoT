const dotEnv = require("dotenv");
// Xác định đường dẫn đến thư mục config
if (process.env.NODE_ENV !== "prod") {
  const configFile = `.env.${process.env.NODE_ENV}`;
  // console.log(configFile);  Éo hiểu vì sao `.env.dev` != ".env.dev"
  dotEnv.config({ path: ".env.dev" });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  HOST: process.env.HOST,
  MQTTPORT: process.env.MQTTPORT,
  MQTTPROTOCOL: process.env.MQTTPROTOCOL,
  TOPIC1: process.env.TOPIC1,
  TOPIC2: process.env.TOPIC2,
  // Not use
  //   EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  //   MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  //   CUSTOMER_SERVICE: "customer_service",
  //   SHOPPING_SERVICE: "shopping_service",
};
