const { DeviceRepository } = require("../database");
const { FormateData } = require("../utils");

const { TOPIC1, TOPIC2, HOST, MQTTPORT, MQTTPROTOCOL } = require("../config");
const mqtt = require("mqtt");

const broker = MQTTPROTOCOL + "://" + HOST;
// initialize the MQTT client
const client = mqtt.connect(broker, { MQTTPORT });
// setup the callbacks
client.on("connect", () => {
  console.log("Connected to MQTT Broker!");
});
client.on("error", function (error) {
  console.log(error);
});
client.publish(TOPIC1, JSON.stringify("ngu"));
class DeviceService {
  constructor() {
    this.repository = new DeviceRepository();
    this.client = client;
  }

  async CreateDevice(deviceInputs) {
    const { homeID, typeDevice, name } = deviceInputs;
    if (typeDevice === "temperatureSensor") {
      deviceInputs.information = { temperature: "37" };
    } else if (typeDevice === "doorSensor") {
      deviceInputs.information = { openOrClose: "close" };
    } else if (typeDevice === "waterSensor") {
      deviceInputs.information = { humidity: "0.5" };
    } else {
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
  async UpdateDeviceByName(deviceInputs) {
    const { name, information } = deviceInputs;
    const deviceResult = await this.repository.UpdateDeviceByName({
      name,
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

  async openOrCloseRemote(deviceInputs) {
    const { _id, openOrClose } = deviceInputs;
    const topic = TOPIC1;
    this.client.publish(topic, JSON.stringify(openOrClose));
    const deviceResult = await this.repository.UpdateDevice({
      _id,
      information: { openOrClose },
    });
    if (deviceResult) {
      return FormateData(deviceResult);
    } else {
      return FormateData(null);
    }
  }
}
module.exports = DeviceService;
