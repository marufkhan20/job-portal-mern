import React from "react";
import { TfiSearch } from "react-icons/tfi";
import { Link } from "react-router-dom";

const InboxSideBar = ({ conversations }) => {
  return (
    <div className="w-[30%] bg-white py-5 rounded-xl overflow-hidden">
      <div className="bg-[#F4F5F7] rounded-full flex items-center justify-between px-4 py-3 mx-5">
        <input
          className="bg-transparent w-full outline-none text-base text-gray-400"
          placeholder="search conversation"
          type="text"
        />
        <TfiSearch className="text-gray-400" />
      </div>

      <div className="mt-3">
        {conversations?.map((conversation) => (
          <Link
            key={conversation?._id}
            to={`/admin/inbox/${conversation?._id}`}
          >
            <div className="flex items-center gap-4 px-5 transition-all shadow-black/25 hover:shadow-xl py-5">
              <img
                className="w-12 h-12 rounded-full"
                src="/img/users/1.jpg"
                alt="user"
              />
              <div className="flex justify-between w-full">
                <div>
                  <h3>{conversation?.participants[1]?.email}</h3>
                  <span className="font-medium text-gray-500">
                    {conversation?.message}
                  </span>
                </div>
                <span className="text-sm text-gray-500">Monday</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InboxSideBar;
