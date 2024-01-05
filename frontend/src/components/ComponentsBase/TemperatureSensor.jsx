import React from "react";
import PropTypes from "prop-types";
import { WiThermometer } from "react-icons/wi";
import { Card } from "flowbite-react";
const TemperatureDisplay = ({
  temperature,
  unit,
  onDeleteDevice,
  onUpdateDevice,
  deviceKey,
  name
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
          <div className="text-center">{name}</div>
          <WiThermometer size={180} color="#ff5733" />
        </div>
        <div className="flex justify-center items-center w-60">
          <div>
            <h1 className="text-center text-sm font-medium text-cyan-700">
              Indoor: {`${temperature}°${unit}`}
            </h1>
            <h2 className="text-center text-sm font-medium text-cyan-700">
              Outdoor: 15°2
            </h2>
            <div className="flex justify-center items-center mt-2">
              <button
                onClick={handleUpdateDevice}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2"
              >
                Update Temperature
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

TemperatureDisplay.propTypes = {
  temperature: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

export default TemperatureDisplay;
