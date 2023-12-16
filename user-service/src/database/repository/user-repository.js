const mongoose = require("mongoose");
const { UserModel } = require("../models");
class UserRepository {
  // example to create a Device
  // async CreateProduct({ name, desc, type, unit,price, available, suplier, banner }){
  //     const device = new DevicetModel({
  //         name, desc, type, unit,price, available, suplier, banner
  //     })
  //     const devicetResult = await device.save();
  //     return deviceResult;
  // }
  
  //add account to database
  async CreateAccount({ username, password, listHome}) {
    const user = new UserModel({
      username,
      password,
      listHome,
    });
    const userResult = await user.save();
    return userResult;
  }

  //login account
  async LoginAccount({ username, password }) {
    const userResult = await UserModel.findOne({
      username,
      password,
    });
    return userResult;
  }

  //add idHome to listHome
  async AddHome({ username, idHome }) {
    const userResult = await UserModel.findOneAndUpdate(
      { username },
      { $push: { listHome: idHome } }
    );
    return userResult;  
  }

  //delete idHome
  async DeleteHome({ username, idHome }) {
    const userResult = await UserModel.findOneAndUpdate(
      { username },
      { $pull: { listHome: idHome } }
    );
  }

}
module.exports = UserRepository;
