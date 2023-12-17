import React from "react";
import { FaPlus } from "react-icons/fa";
import { Card } from "flowbite-react";
import { IoIosHome } from "react-icons/io";
export const AddSmallHomeComponent = () => {
  return (
    <Card>
      <div className="flex items-center justify-center my-5 w-[467.9px]">
        <FaPlus size={164} />
      </div>
    </Card>
  );
};
export const SmallHomeComponent = () => {
  return (
    <Card>
      <div className="flex items-center justify-center my-5 w-[467.9px]">
        <IoIosHome color="purple" size={164} />
      </div>
    </Card>
  );
};
