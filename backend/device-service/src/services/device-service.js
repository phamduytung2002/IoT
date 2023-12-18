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
  async CreateDevice(deviceInputs) {
    const { homeID, typeDevice, name } = deviceInputs;
    if (typeDevice === "temperatureSensor") {
      deviceInputs.information = { temperature: "37" };
    } else if (typeDevice === "doorSensor") {
      deviceInputs.information = { openOrClose: "close" };
    } else if (typeDevice === "waterSensor") {
      deviceInputs.information = { humidity: "0.5" };
    }
    else {
      return "Error Type";
    }
    const devicetResult = await this.repository.CreateDevice({
      name,
      homeID,
      typeDevice,
      information: deviceInputs.information,
    });
    return FormateData(devicetResult);
  }
  //Get all device by homeID
  async FindDevice(deviceInputs) {
    const { homeID } = deviceInputs;
    const deviceResult = await this.repository.FindDevice({ homeID });
    if (deviceResult) {
      return FormateData(deviceResult);
    } else {
      return FormateData(null);
    }
  }
  async FindDeviceByType(deviceInputs) {
    const { homeID, typeDevice } = deviceInputs;
    const deviceResult = await this.repository.FindDeviceByType({
      homeID,
      typeDevice,
    });
    if (deviceResult) {
      return FormateData(deviceResult);
    } else {
      return FormateData(null);
    }
  }
  async FindDeviceByTypeAndID(deviceInputs) {
    const { homeID, typeDevice, _id } = deviceInputs;
    const deviceResult = await this.repository.FindDeviceByTypeAndID({
      homeID,
      typeDevice,
      _id,
    });
    if (deviceResult) {
      return FormateData(deviceResult);
    } else {
      return FormateData(null);
    }
  }
  async FindDeviceByID(deviceInputs) {
    const { _id } = deviceInputs;
    const deviceResult = await this.repository.FindDeviceByID({
      _id,
    });
    if (deviceResult) {
      return FormateData(deviceResult);
    } else {
      return FormateData(null);
    }
  }

  // This function to Device update information
  async UpdateDevice(deviceInputs) {
    const { _id, information } = deviceInputs;
    const deviceResult = await this.repository.UpdateDevice({
      _id,
      information,
    });
    if (deviceResult) {
      return FormateData(deviceResult);
    } else {
      return FormateData(null);
    }
  }
  // Delete device by Id
  async DeleteDevice(deviceInputs) {
    const { _id } = deviceInputs;
    const deviceResult = await this.repository.DeleteDevice({
      _id,
    });
    if (deviceResult) {
      return FormateData(deviceResult);
    } else {
      return FormateData(null);
    }
  }
  async DeleteDeviceByType(deviceInputs) {
    const { homeID, typeDevice } = deviceInputs;
    const deviceResult = await this.repository.DeleteDeviceByType({
      homeID,
      typeDevice,
    });
    if (deviceResult) {
      return FormateData(deviceResult);
    } else {
      return FormateData(null);
    }
  }
  async DeleteDeviceByHomeID(deviceInputs) {
    const { homeID } = deviceInputs;
    const deviceResult = await this.repository.DeleteDeviceByHomeID({
      homeID,
    });
    if (deviceResult) {
      return FormateData(deviceResult);
    } else {
      return FormateData(null);
    }
  }

  // This function to website update information sensor
  async GetInformationDevice(deviceInputs) {
    const { _id } = deviceInputs;
    const deviceResult = await this.repository.GetInformation({
      _id,
    });
    if (deviceResult) {
      return FormateData(deviceResult);
    } else {
      return FormateData(null);
    }
  }
}
module.exports = DeviceService;
