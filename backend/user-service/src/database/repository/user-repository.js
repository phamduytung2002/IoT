const mongoose = require("mongoose");
const { UserModel } = require("../models");
class UserRepository {
  //add account to database
  async CreateAccount({ username, password, salt }) {
    const user = new UserModel({
      username,
      password,
      salt,
      listHome: [],
    });
    // console.log(username);
    try {
      const userResult = await user.save();
      return userResult;
    } catch (error) {
      // console.log("Database Error: ",error);
    }
  }

  //login account
  // async LoginAccount({ username, password }) {
  //   const userResult = await UserModel.findOne({
  //     username,
  //     password,
  //   });
  //   return userResult;
  // }

  // find user
  async FindUser({ username }) {
    const userResult = await UserModel.findOne({
      username: username,
    });
    return userResult;
  }

  //get all home
  async GetAllHome({ _id }) {
    const profile = await UserModel.findById(_id);
    // console.log(profile);
    return profile.listHome;
  }

  //  If delete Home, delete idHome in listHome
  //add idHome to listHome
  async AddHome({ _id, idHome }) {
    const profile = await UserModel.findById(_id);
    if (profile.listHome.includes(idHome)) return profile;
    else {
      profile.listHome.push(idHome);
      return await profile.save();
    }
  }

  //delete idHome
  // async DeleteHome({ username, idHome }) {
  //   const userResult = await UserModel.findOneAndUpdate(
  //     { username },
  //     { $pull: { listHome: idHome } }
  //   );
  // }
}
module.exports = UserRepository;
