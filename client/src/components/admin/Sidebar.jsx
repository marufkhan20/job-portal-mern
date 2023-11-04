import React from "react";
import { GrWorkshop } from "react-icons/gr";
import { HiUsers } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { MdHomeRepairService, MdPayment } from "react-icons/md";
import { RiDashboard3Fill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="bg-white min-h-full">
      <ul>
        <li>
          <Link
            to="/admin"
            className={`flex items-center gap-5 px-5 py-3 hover:bg-light text-base font-medium hover:text-primary ${
              pathname === "/admin" && "bg-light text-primary"
            }`}
          >
            <RiDashboard3Fill />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/services"
            className={`flex items-center gap-5 px-5 py-3 hover:bg-light text-base font-medium hover:text-primary ${
              pathname === "/admin/services" && "bg-light text-primary"
            }`}
          >
            <MdHomeRepairService />
            <span>Services</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className="flex items-center gap-5 px-5 py-3 transition hover:bg-light text-base font-medium hover:text-primary"
          >
            <HiUsers />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orders"
            className="flex items-center gap-5 px-5 py-3 transition hover:bg-light text-base font-medium hover:text-primary"
          >
            <GrWorkshop />
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/payment-method"
            className={`flex items-center gap-5 px-5 py-3 hover:bg-light text-base font-medium hover:text-primary ${
              pathname === "/admin/payment-method" && "bg-light text-primary"
            }`}
          >
            <MdPayment />
            <span>Payment Method</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/settings"
            className="flex items-center gap-5 px-5 py-3 transition hover:bg-light text-base font-medium hover:text-primary"
          >
            <IoMdSettings />
            <span>Setting</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
