import React from "react";
import SideNavigation from "./ComponentsBase/SideNavigation";
import TemperatureDisplay from "./ComponentsBase/TemperatureSensor";
import HumidityComponent from "./ComponentsBase/HumiditySensor";
import { DoorComponent } from "./ComponentsBase/DoorComponent";
import WeatherChart from "./ComponentsBase/WeatherChart";
import AddDeviceComponent from "./ComponentsBase/AddDeviceComponent";

export const Home = () => {
  const openDoor = true;
  return (
    <div className="flex">
      <div className="fixed">
        <SideNavigation />
      </div>
      <div className="ml-80 m-5 p-2">
        <div className="text-3xl font-bold mb-4 text-center">Home's Biển ID1</div>
        <div className="rounded-lg bg-slate-300 mb-2 p-4">
          <WeatherChart />
        </div>
        <div className="mb-4 mt-4 text-center text-2xl font-bold">
          My Device
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <TemperatureDisplay temperature={37} unit="24" />
          </div>
          <div>
            <HumidityComponent humidity={60.5} />
          </div>
          <div>
            <DoorComponent openDoor={openDoor} />
          </div>
          <div>
            <AddDeviceComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
