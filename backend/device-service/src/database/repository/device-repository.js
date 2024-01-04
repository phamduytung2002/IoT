const mongoose = require("mongoose");
const { DeviceModel } = require("../models");

class DeviceRepository {
  // example to create a Device
  // async CreateProduct({ name, desc, type, unit,price, available, suplier, banner }){
  //     const device = new DevicetModel({
  //         name, desc, type, unit,price, available, suplier, banner
  //     })
  //     const devicetResult = await device.save();
  //     return deviceResult;
  // }
  async CreateDevice({ homeID, typeDevice, information, name }) {
    const device = new DeviceModel({
      name,
      homeID,
      typeDevice,
      information,
    });
    const deviceResult = await device.save();
    return deviceResult;
  }
  async FindDevice({ homeID }) {
    const deviceResult = await DeviceModel.find({
      homeID,
    });
    return deviceResult;
  }
  async FindDeviceByType({ homeID, typeDevice }) {
    const deviceResult = await DeviceModel.find({
      homeID,
      typeDevice,
    });
    return deviceResult;
  }
  async FindDeviceByTypeAndID({ homeID, typeDevice, _id }) {
    const deviceResult = await DeviceModel.find({
      homeID,
      typeDevice,
      _id,
    });
    return deviceResult;
  }
  async FindDeviceByID({ _id }) {
    const deviceResult = await DeviceModel.find({
      _id,
    });
    return deviceResult;
  }
  async UpdateDevice({ _id, information }) {
    // console.log(_id, information)
    const deviceResult = await DeviceModel.findOneAndUpdate(
      { _id },
      { information }
    );
    return deviceResult;
  }
  async UpdateDeviceByName({ name, information }) {
    try {
      const deviceResult = await DeviceModel.findOneAndUpdate(
        { name },
        { information }
      );
      return deviceResult;
    }
    catch (error){
      console.log(error)
    }
  }
  async DeleteDevice({ _id }) {
    const deviceResult = await DeviceModel.findOneAndDelete({
      _id,
    });
    return deviceResult;
  }
  async DeleteDeviceByType({ homeID, typeDevice }) {
    const deviceResult = await DeviceModel.deleteMany({
      homeID,
      typeDevice,
    });
    return deviceResult;
  }
  async DeleteDeviceByHomeID({ homeID }) {
    const deviceResult = await DeviceModel.deleteMany({
      homeID,
    });
    return deviceResult;
  }
  async DeleteDeviceByID({ name }) {
    const deviceResult = await DeviceModel.deleteMany({
      name,
    });
    return deviceResult;
  }
  async GetInformation({ _id }) {
    // get information of device
    const deviceResult = await DeviceModel.findById(_id);
    return deviceResult.information;
  }
}
module.exports = DeviceRepository;
