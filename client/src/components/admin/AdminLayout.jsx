import React from "react";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children, title, icon }) => {
  return (
    <main className="flex gap-10 bg-[#F5F7F9]">
      <div className="w-[15%]">
        <Sidebar />
      </div>
      <div className="w-[85%] min-h-[90vh] pr-10">
        <div className="flex items-center gap-[10px] mt-7 mb-10">
          <div className="text-2xl">{icon}</div>
          <h3 className="text-2xl">{title}</h3>
        </div>
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
