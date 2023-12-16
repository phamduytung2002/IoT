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
    app.post("/user/register", async (req, res, next) => {
        const { username, password, listHome } =
          req.body;
        // validation
        const { data } = await service.CreateAccount({
          username,
          password,
          listHome,
        });
        return res.json(data);
      });

    // login account route
    app.post("/user/login", async (req, res, next) => {
        const { username, password } =
          req.body;
        // validation
        const { data } = await service.LoginAccount({
          username,
          password,
        });
        return res.json(data);
      });
    
    // add idHome to listHome route
    app.post("/user/addHome", async (req, res, next) => {
        const { username, idHome } =
          req.body;
        // validation
        const { data } = await service.AddHome({
          username,
          idHome,
        });
        return res.json(data);
      });

    // delete idHome route
    app.post("/user/deleteHome", async (req, res, next) => {
        const { username, idHome } =
          req.body;
        // validation
        const { data } = await service.DeleteHome({
          username,
          idHome,
        });
        return res.json(data);
      });
    
}