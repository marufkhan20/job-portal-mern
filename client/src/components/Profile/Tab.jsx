import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFillBagFill, BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";

const Tab = ({ activeTab, tabControl }) => {
  return (
    <div className="grid grid-cols-4 mt-6 bg-white p-1 shadow-sm rounded-md text-center">
      <div
        className={`py-[10px] flex items-center justify-center gap-2 transition hover:text-primary rounded-md cursor-pointer ${
          activeTab === 1
            ? "bg-primary text-white"
            : "hover:text-primary bg-transparent"
        }`}
        onClick={() => tabControl(1)}
      >
        <AiFillHome />
        <span>Home</span>
      </div>
      <div
        className={`py-[10px] flex items-center justify-center gap-2 transition hover:text-primary rounded-md cursor-pointer ${
          activeTab === 2
            ? "bg-primary text-white"
            : "hover:text-primary bg-transparent"
        }`}
        onClick={() => tabControl(2)}
      >
        <BsFillInfoCircleFill />
        <span>About</span>
      </div>
      <div
        className={`py-[10px] flex items-center justify-center gap-2 transition hover:text-primary rounded-md cursor-pointer ${
          activeTab === 3
            ? "bg-primary text-white"
            : "hover:text-primary bg-transparent"
        }`}
        onClick={() => tabControl(3)}
      >
        <IoMdSettings />
        <span>Setting</span>
      </div>
      <div
        className={`py-[10px] flex items-center justify-center gap-2 transition hover:text-primary rounded-md cursor-pointer ${
          activeTab === 4
            ? "bg-primary text-white"
            : "hover:text-primary bg-transparent"
        }`}
        onClick={() => tabControl(4)}
      >
        <BsFillBagFill />
        <span>My Orders</span>
      </div>
    </div>
  );
};

export default Tab;
