import React from "react";
import SideNavigation from "./ComponentsBase/SideNavigation";
import TemperatureDisplay from "./ComponentsBase/TemperatureSensor";
import HumidityComponent from "./ComponentsBase/HumiditySensor";
import { DoorComponent } from "./ComponentsBase/DoorComponent";
import WeatherChart from "./ComponentsBase/WeatherChart";
import AddDeviceComponent from "./ComponentsBase/AddDeviceComponent";
import { useParams } from "react-router-dom";
import { getAllDevice } from "../api/getAllDevice";
import { Modal, Button, TextInput } from "flowbite-react";
import { addDevice } from "../api/addDevice";
import { deleteDevice } from "../api/deleteDevice";
import { getInformation } from "../api/getInformationDevice";

export const Home = () => {
  const openDoor = true;
  const { homeId } = useParams();
  const [data, setData] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [nameDevice, setNameDevice] = React.useState("");
  const [typeDevice, setTypeDevice] = React.useState("temperatureSensor");
  const [refresh, setRefresh] = React.useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }
  const handleTypeDeviceChange = (e) => {
    setTypeDevice(e.target.value);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDevice({ homeID: homeId });
        setData(response?.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [openModal, refresh]);

  return (
    <div className="flex">
      <div className="fixed">
        <SideNavigation />
      </div>
      <div className="ml-80 m-5 p-2">
        <div className="text-3xl font-bold mb-4 text-center">
          Home's Biển - {homeId}
        </div>
        <div className="rounded-lg bg-slate-300 mb-2 p-4">
          <WeatherChart />
        </div>
        <div className="mb-4 mt-4 text-center text-2xl font-bold">
          My Device
        </div>
        <div className="grid grid-cols-2 gap-4">
          {data?.map((device) => {
            if (device.typeDevice === "temperatureSensor") {
              return (
                <div>
                  <TemperatureDisplay
                    temperature={device.information.temperature}
                    unit="24"
                    deviceKey={device._id}
                    onUpdateDevice={async (deviceKey) => {
                      await getInformation(
                        JSON.stringify({
                          _id: deviceKey,
                        })
                      );
                      alert("Update success");
                      setRefresh(!refresh);
                    }}
                    onDeleteDevice={async (deviceKey) => {
                      await deleteDevice(
                        JSON.stringify({
                          _id: deviceKey,
                        })
                      );
                      alert("Delete success");
                      setRefresh(!refresh);
                    }}
                  />
                </div>
              );
            } else if (device.typeDevice === "waterSensor") {
              return (
                <div>
                  <HumidityComponent
                    deviceKey={device._id}
                    humidity={device.information.humidity}
                    onUpdateDevice={async (deviceKey) => {
                      await getInformation(
                        JSON.stringify({
                          _id: deviceKey,
                        })
                      );
                      alert("Update success");
                      setRefresh(!refresh);
                    }}
                    onDeleteDevice={async (deviceKey) => {
                      await deleteDevice(
                        JSON.stringify({
                          _id: deviceKey,
                        })
                      );
                      alert("Delete success");
                      setRefresh(!refresh);
                    }}
                  />
                </div>
              );
            } else if (device.typeDevice === "doorSensor") {
              return (
                <div>
                  <DoorComponent
                    openDoor={device.information.openOrClose}
                    deviceKey={device._id}
                    onDeleteDevice={async (deviceKey) => {
                      await deleteDevice(
                        JSON.stringify({
                          _id: deviceKey,
                        })
                      );
                      alert("Delete success");
                      setRefresh(!refresh);
                    }}
                    
                  />
                </div>
              );
            } else {
              return null; // Handle other device types or remove this line if not needed
            }
          })}
          <div onClick={() => setOpenModal(true)}>
            <AddDeviceComponent />
          </div>
          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="text-3xl font-bold mb-4 text-center">
                Add new device
              </div>
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select type device
                </label>
                <select
                  id="countries"
                  value={typeDevice}
                  onChange={handleTypeDeviceChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="temperatureSensor">temperatureSensor</option>
                  <option value="waterSensor">waterSensor</option>
                  <option value="doorSensor">doorSensor</option>
                </select>
              </div>
              <TextInput
                className="mt-4"
                id="text"
                type="text"
                required
                placeholder="Name device"
                onChange={(event) => setNameDevice(event.target.value)}
              />
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  color="failure"
                  onClick={async () => {
                    if (nameDevice === "")
                      return alert("Please enter name Device");
                    else {
                      await addDevice(
                        JSON.stringify({
                          homeID: homeId,
                          name: nameDevice,
                          typeDevice: typeDevice,
                        })
                      );
                      // console.log(typeDevice);
                      setOpenModal(false);
                    }
                  }}
                >
                  {"Add new home"}
                </Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Home;
