const { DeviceRepository } = require("../database");
const { FormateData } = require("../utils");

class UserService {
  constructor() {
    this.repository = new DeviceRepository();
  }

  // example create device
  //   async CreateDevice(deviceInputs) {
  //     const devicetResult = await this.repository.CreateDevice(deviceInputs);
  //     return FormateData(devicetResult);
  //   }
  
  // rewite CreateAccount
  async CreateAccount(userInputs) {
    const userResult = await this.repository.CreateAccount(userInputs);
    return FormateData(userResult);
  }
}
module.exports = DeviceService;
