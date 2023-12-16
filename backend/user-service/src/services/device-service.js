const { DeviceRepository } = require("../database");
const { FormateData } = require("../utils");

class DeviceService {
  constructor() {
    this.repository = new DeviceRepository();
  }
  // example create device
  //   async CreateDevice(deviceInputs) {
  //     const devicetResult = await this.repository.CreateDevice(deviceInputs);
  //     return FormateData(devicetResult);
  //   }
}
module.exports = DeviceService;
