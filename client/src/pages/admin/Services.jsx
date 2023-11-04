/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { IoIosCopy } from "react-icons/io";
import { MdHomeRepairService } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  useDeleteServiceMutation,
  useDublicateServiceQuery,
  useGetAllServicesQuery,
} from "../../features/service/serviceApi";

const Services = () => {
  const [action, setAction] = useState();
  const [services, setServices] = useState([]);

  // delete service
  const [deleteService, { data: deletedService }] = useDeleteServiceMutation();

  useEffect(() => {
    if (deletedService?._id) {
      toast.success("Service deleted successfully");

      const updatedServices = [...services]?.filter(
        (item) => item?._id !== deletedService?._id
      );

      setServices(updatedServices);
    }
  }, [deletedService]);

  const deleteServiceHandler = (id) => {
    deleteService(id);
  };

  const {
    data: servicesArr,
    isLoading,
    isError,
    error,
  } = useGetAllServicesQuery();

  useEffect(() => {
    if (servicesArr?.length > 0) {
      setServices(servicesArr);
    }
  }, [servicesArr]);

  // dublicate service
  const [dublicateId, setDublicateId] = useState();

  const { data: newService, isLoading: newLoading } = useDublicateServiceQuery(
    dublicateId,
    {
      skip: !dublicateId,
    }
  );

  const dublicateService = (id) => {
    setDublicateId(id);
  };

  useEffect(() => {
    if (newService?._id) {
      toast.success("Service Dublicate Successfully");
      setServices([...services, newService]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newService]);

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && error) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !error && services?.submitAssignments?.length === 0)
    content = <span>No Submitted Assignment Found!!</span>;

  if (!isLoading && !isError && services?.length > 0) {
    content = services?.map((service) => {
      const { _id, serviceImages, title, orders } = service;

      return (
        <div className="py-4 px-5 rounded-md bg-white border mt-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              className="w-[130px] h-[70px] rounded-md"
              src={`${process.env.REACT_APP_SERVER_URL}${serviceImages[0]}`}
              alt="service"
            />
            <h3 className="text-lg">{title}</h3>
          </div>
          <div>
            <h3>Completed Order: {orders?.length}</h3>
          </div>
          <div>
            <h3>Active Order: {orders?.length}</h3>
          </div>
          <div className="relative">
            <div
              className="w-[35px] h-[40px] border rounded flex items-center justify-center cursor-pointer"
              onClick={() => setAction(action === _id ? 0 : _id)}
            >
              <BiDotsVerticalRounded />
            </div>

            {action === _id && (
              <div className="py-1 rounded border bg-white absolute top-12 right-0 min-w-[170px] z-50">
                <li className="flex items-center gap-2 font-medium w-full py-2 px-5 cursor-pointer transition hover:bg-light hover:text-primary">
                  <FaRegEdit />
                  <span>Edit</span>
                </li>
                <li className="flex items-center gap-2 font-medium w-full py-2 px-5 cursor-pointer transition hover:bg-light hover:text-primary">
                  <FaEye />
                  <Link to={`/services/${_id}`}>
                    <span>Preview Item</span>
                  </Link>
                </li>
                <li
                  className="flex items-center gap-2 font-medium w-full py-2 px-5 cursor-pointer transition hover:bg-light hover:text-primary"
                  onClick={() => dublicateService(_id)}
                >
                  <IoIosCopy />
                  <span>Dublicate</span>
                </li>
                <li
                  className="flex items-center gap-2 font-medium w-full py-2 px-5 cursor-pointer transition hover:bg-light hover:text-primary"
                  onClick={() => deleteServiceHandler(_id)}
                >
                  <RiDeleteBin5Line />
                  <span>Delete</span>
                </li>
              </div>
            )}
          </div>
        </div>
      );
    });
  }
  return (
    <AdminLayout title="Servcices" icon={<MdHomeRepairService />}>
      <div className="py-4 px-5 rounded-md bg-white border">
        <h3 className="text-lg mb-4">Service Lists (2)</h3>
        <div className="flex items-center justify-between">
          <input
            className="py-2 px-4 border w-[280px] rounded-[5px] outline-none focus:ring-1 inline-block"
            type="text"
            placeholder="Search by service title"
          />
          <Link
            class="bg-primary text-white py-[10px] px-7 inline-block uppercase text-[13px] font-semibold mt-4 transition border border-transparent hover:border-light hover:bg-white hover:text-secondary rounded-md"
            to="/admin/services/add-service"
          >
            Create New Service
          </Link>
        </div>
      </div>

      {content}
      {newLoading && (
        <div>
          <img
            className="mx-auto w-14 mt-5"
            src="/img/loading.gif"
            alt="loading"
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default Services;
