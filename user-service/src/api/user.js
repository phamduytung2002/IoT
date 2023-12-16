const UserAuth = require("./middlewares/auth");
const UserService = require("../services/user-service")
module.exports = (app) => {
    const service = new UserService();
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

    // create account route
    app.post("/user/create", async (req, res, next) => {
        const { username, password, idHome } =
          req.body;
        // validation
        const { data } = await service.CreateAccount({
          username,
          password,
          idHome,
        });
        return res.json(data);
      });
}