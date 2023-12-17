const UserAuth = require("./middlewares/auth");
const UserService = require("../services/user-service");
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

  // login account route -------DONE--------
  app.post("/user/login", async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const { data } = await service.LoginAccount({ username, password });
      return res.json(data);
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  });

  // create account route  ---------DONE-------
  app.post("/user/register", async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const { data } = await service.CreateAccount({ username, password });
      return res.json(data);
    } catch (error) {
      console.log(error);
      return res.json({ error });
    }
  });

  // add home route
  app.post("/user/addHome", UserAuth, async (req, res, next) => {
    const { idHome } = req.body;
    const { _id } = req.user;
    const { data } = await service.AddHome(_id, { idHome });
    return res.json(data);
  });
  //get all home ---------DONE-------
  app.get("/user/getAllHome", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { data } = await service.GetAllHome(_id);
    return res.json(data);
  });
  
  // get user info route ????? ROUTE leak info ?? 
  // app.post("/user/getUser", async (req, res, next) => {
  //   const { username } = req.body;
  //   const { data } = await service.GetUser({ username });
  //   return res.json(data);
  // });

  // delete home route
  // app.post("/user/deleteHome", async (req, res, next) => {
  //     const { username, idHome } = req.body;
  //     const { data } = await service.DeleteHome({ username, idHome });
  //     return res.json(data);
  // });
  // ------------------------------------------
};
