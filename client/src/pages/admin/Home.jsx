import React from "react";
import { RiDashboard3Fill } from "react-icons/ri";
import AdminLayout from "../../components/admin/AdminLayout";

const Home = () => {
  return (
    <AdminLayout title="Dashboard" icon={<RiDashboard3Fill />}>
      hello
    </AdminLayout>
  );
};

export default Home;
