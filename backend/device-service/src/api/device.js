const UserAuth = require("./middlewares/auth");
const DeviceService = require("../services/device-service");
const express = require("express");

const app = express();

module.exports = (app) => {
  const service = new DeviceService();
  // api test
  app.get("/test", function (request, response) {
    console.log("Received 'test' request");
    response.status(200).json({ message: "Success" });
  });
  //api GET
  app.post("/device/getAllDevice", UserAuth, async (req, res, next) => {
    const { homeID } = req.body;
    // Check homeID belong to user ??? ( not yet ) => if has time, save list home in user (cookie)
    // validation = check homeID in list home of user

    try {
      const { data } = await service.FindDevice({ homeID });
      return res.json(data);
    } catch (err) {
      return res.json({ message: "Error" });
    }
  });

  // api create device
  app.post("/device/create", UserAuth, async (req, res, next) => {
    const { homeID, typeDevice, name } = req.body;
    // validation
    try {
      const { data } = await service.CreateDevice({ homeID, typeDevice, name });
      return res.json(data);
    } catch (err) {
      return res.json({ message: "Error" });
    }
  });

  // Get information of device by Id
  app.post("/device/getInformation", UserAuth, async (req, res, next) => {
    const { _id } = req.body;
    try {
      const { data } = await service.GetInformationDevice({ _id });
      return res.json(data);
    } catch (err) {
      return res.json({ message: "Error" });
    }
  });
  // Delete device by Id
  app.delete("/device/delete", UserAuth, async (req, res, next) => {
    const { _id } = req.body;
    try {
      const { data } = await service.DeleteDevice({ _id });
      return res.json(data);
    } catch (err) {
      return res.json({ message: "Error" });
    }
  });
  // Update device by Id's device
  app.put("/device/update", async (req, res, next) => {
    const { _id, information } = req.body;
    try {
      const { data } = await service.UpdateDevice({ _id, information });
      return res.json(data);
    } catch (err) {
      return res.json({ message: "Error" });
    }
  });
};
app.put("/device/updateByName", async (req, res, next) => {
  const { name, information } = req.body;
  try {
    const { data } = await service.UpdateDeviceByName({ name, information });
    return res.json(data);
  } catch (err) {
    return res.json({ message: "Error" });
  }
});

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
