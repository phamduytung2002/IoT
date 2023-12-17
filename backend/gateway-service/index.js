const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());

// app.use("/device", proxy("http://localhost:8001"));
app.use("/user", proxy("http://localhost:8001"));
// app.use("/", proxy("http://localhost:8002")); // products

app.listen(PORT, () => {
  console.log(`Gateway is Listening to Port ${PORT}`);
});
