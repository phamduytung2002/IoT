import { Card } from "flowbite-react";
import React from "react";
import { BsDoorOpen } from "react-icons/bs";
import { BsDoorClosedFill } from "react-icons/bs";
import { ToggleSwitch } from "flowbite-react";
export const DoorComponent = ({ doorStatus }) => {
  const [doorStatus_, setDoorStatus_] = React.useState(doorStatus);
  return (
    <Card>
      <div className="flex">
        <div>
          <div className="text-center">Door Area 1</div>
          <div className="flex justify-center items-center">
            {doorStatus_ ? (
              <BsDoorOpen size={180} color="#ff5733" />
            ) : (
              <BsDoorClosedFill size={180} color="#ff5733" />
            )}
          </div>
        </div>
        <div className="flex justify-center items-center w-60">
          <div>
            <ToggleSwitch
              className="text-cyan-700 mb-2"
              checked={doorStatus_}
              label="Toggle me"
              onChange={() => {
                /// await api set door status in db
                // update interface
                setDoorStatus_(!doorStatus_);
              }}
            />
            <button
              onClick={() => {}}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-2 ml-2"
            >
              Delete Device
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
