const { UserRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} = require("../utils");
class UserService {
  constructor() {
    this.repository = new UserRepository();
  }
  // example create device
  //   async CreateDevice(deviceInputs) {
  //     const devicetResult = await this.repository.CreateDevice(deviceInputs);
  //     return FormateData(devicetResult);
  //   }
  async CreateAccount(userInputs) {
    const { username, password } = userInputs;
    // create salt
    let salt = await GenerateSalt();
    let userPassword = await GeneratePassword(password, salt);
    const existingUser = await this.repository.CreateAccount({
      username: username,
      password: userPassword,
      salt: salt,
    });
    return FormateData(existingUser);
  }
  async LoginAccount(userInputs) {
    const { username, password } = userInputs;
    const userResult = await this.repository.FindUser({ username: username });
    if (userResult) {
      const validPassword = await ValidatePassword(
        password,
        userResult.password,
        userResult.salt
      );
      if (validPassword) {
        const token = await GenerateSignature({
          username: userResult.username,
          _id: userResult._id,
        });
        return FormateData({ id: userResult._id, token });
      }
    }
    return FormateData(null);
  }

  async GetUser(userInputs) {
    const { username } = userInputs;
    const userResult = await this.repository.FindUser({ username: username });
    if (userResult) {
      return FormateData(userResult);
    } else {
      return FormateData(null);
    }
  }
  async GetAllHome(_id) {
    const userResult = await this.repository.GetAllHome({ _id });
    return FormateData(userResult);
  }
  async AddHome(_id, userInputs) {
    const { idHome } = userInputs;
    const userResult = await this.repository.AddHome({_id, idHome});
    return FormateData(userResult);
  }

  // async DeleteHome(userInputs) {
  //   const userResult = await this.repository.DeleteHome(userInputs);
  //   return FormateData(userResult);
  // }
}
module.exports = UserService;
