/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GrWorkshop } from "react-icons/gr";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../features/order/orderApi";

const OrderList = () => {
  const [status, setStatus] = useState("active");

  const { data: orders, isLoading, isError, error } = useGetOrdersQuery();

  // update order status
  const [updateOrderStatus, { data: updatedOrder }] =
    useUpdateOrderStatusMutation();

  useEffect(() => {
    if (updatedOrder?._id) {
      toast.success("Order status updated successfully");
    }
  }, [updatedOrder]);

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && error) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !error && orders?.length === 0)
    content = <span>No Order Found!!</span>;

  if (!isLoading && !isError && orders?.length > 0) {
    content = orders
      ?.filter((order) => {
        if (status === "active") {
          return (
            order.status === "pending" ||
            order.status === "progress" ||
            order.status === "delivered"
          );
        } else {
          return order.status === status;
        }
      })
      .map((order) => {
        const {
          service,
          user,
          paymentMethod,
          paymentNumber,
          transactionId,
          status,
          screenshot,
        } = order;

        return (
          <tr key={order._id} className="border-b hover:bg-[#F1F5F9]">
            <td className="py-4 px-4 border-r">
              <img
                className="w-12 h-12 rounded-full"
                src={`${process.env.REACT_APP_SERVER_URL}${service?.serviceImages[0]}`}
                alt="user"
              />
            </td>
            <td className="py-4 px-4 border-r">
              {user?.email?.replace("@gmail.com", "")}
            </td>
            <td className="py-4 px-4 border-r">{paymentMethod?.methodName}</td>
            <td className="py-4 px-4 border-r">
              <p>Number: {paymentNumber}</p>
              <p>Transaction ID: {transactionId}</p>
              {screenshot && (
                <a
                  href={`${process.env.REACT_APP_SERVER_URL}${screenshot}`}
                  target="_blank"
                  className="inline-block bg-green-400 mt-2 py-1 px-4 rounded-md text-white font-semibold"
                  rel="noreferrer"
                >
                  See Screenshot
                </a>
              )}
            </td>
            <td className="py-4 px-4 border-r">
              <select
                className="border rounded py-2 px-4 outline-none focus:ring-1"
                onChange={(e) =>
                  updateOrderStatus({
                    orderId: order?._id,
                    status: e.target.value,
                  })
                }
              >
                <option>Select Status</option>
                <option selected={status === "pending"} value="pending">
                  Pending
                </option>
                <option selected={status === "progress"} value="progress">
                  Approve
                </option>
                <option selected={status === "rejected"} value="rejected">
                  Rejected
                </option>
                <option selected={status === "cancenlled"} value="cancenlled">
                  Cacenlled
                </option>
                <option selected={status === "delivered"} value="delivered">
                  Delivered
                </option>
                <option selected={status === "completed"} value="completed">
                  Completed
                </option>
              </select>
            </td>
            <td className="py-4 px-4 border-r">
              <div className="flex items-center gap-5">
                <Link
                  to={`/order/inbox/${order?._id}/${user?._id}`}
                  className="bg-primary text-white block py-2 px-4 rounded transition hover:bg-primary/60"
                >
                  View Order
                </Link>
              </div>
            </td>
          </tr>
        );
      });
  }
  return (
    <AdminLayout title="Order List" icon={<GrWorkshop />}>
      <div className="py-4 px-5 rounded-md bg-white border">
        <h3 className="text-lg mb-4">Order Lists ({orders?.length})</h3>
        <div className="flex items-center justify-between">
          <select
            className="py-2 px-4 border w-[280px] rounded-[5px] outline-none focus:ring-1 inline-block"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Order Status</option>
            <option selected={status === "active"} value="active">
              Active
            </option>
            <option selected={status === "rejected"} value="rejected">
              Rejected
            </option>
            <option selected={status === "cancelled"} value="cancelled">
              Cancelled
            </option>
            <option selected={status === "completed"} value="completed">
              Completed
            </option>
          </select>
        </div>
      </div>

      <div className="p-5 mt-5 bg-white border rounded-lg w-full">
        <table class="table-auto w-full border">
          <thead className="bg-[#F8FAFC] border text-left box-border">
            <tr>
              <th className="text-sm py-2 px-4 border-r">Service</th>
              <th className="text-sm py-2 px-4 border-r">User Name</th>
              <th className="text-sm py-2 px-4 border-r">Payment Method</th>
              <th className="text-sm py-2 px-4 border-r">Payment Details</th>
              <th className="text-sm py-2 px-4">Order Status</th>
              <th className="text-sm py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default OrderList;
