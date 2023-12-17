import React from "react";
import { FaPlus } from "react-icons/fa";
import { Card } from "flowbite-react";
const AddDeviceComponent = () => {
  return (
    <Card>
      <div className="flex items-center justify-center my-5">
        <FaPlus size={164} />
      </div>
    </Card>
  );
};

export default AddDeviceComponent;
