import React from "react";
import { FaTint } from "react-icons/fa";
import { Card } from "flowbite-react";

const HumidityIcon = ({ size, color }) => {
  return <FaTint size={size} color={color} />;
};

const HumidityComponent = ({
  humidity,
  onDeleteDevice,
  deviceKey,
  onUpdateDevice,
}) => {
  const handleDeleteDevice = () => {
    // Gọi hàm onDeleteDevice và truyền key của thiết bị cần xóa
    onDeleteDevice(deviceKey);
  };
  const handleUpdateDevice = () => {
    onUpdateDevice(deviceKey);
  };
  return (
    <Card>
      <div className="flex">
        <div className="">
          <div className="text-center">Humidity Area 1</div>
          <div className="m-3">
            <HumidityIcon size={156} color="#3498db" />
          </div>
        </div>
        <div className="flex justify-center items-center w-60">
          <div>
            <h1 className="text-center text-sm font-medium text-cyan-700">
              Humidity Indoor: {humidity}%
            </h1>
            <h2 className="text-center text-sm font-medium text-cyan-700">
              Outdoor: 15.2 %
            </h2>
            <div className="flex justify-center items-center mt-2">
              <button
                onClick={handleUpdateDevice}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2"
              >
                Update Humidity
              </button>
              <button
                onClick={handleDeleteDevice}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-2 ml-2"
              >
                Delete Device
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HumidityComponent;
