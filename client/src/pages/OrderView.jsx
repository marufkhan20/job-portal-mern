import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Inbox from "../components/Inbox/Inbox";
import {
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
} from "../features/order/orderApi";

const OrderView = () => {
  const { user } = useSelector((state) => state.auth || {});
  const { orderId, userId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [deliveryBox, setDeliveryBox] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      if (user?.role !== "admin" && user?.userId !== userId) {
        toast.error("You can't access another order!!");
        navigate(`/profile/${user?.userId}`);
      }
    }
  }, [navigate, user, userId]);

  // get order details
  const { data, isLoading } = useGetOrderQuery(orderId, {
    pollingInterval: 1500,
  });

  useEffect(() => {
    if (data?._id) {
      setOrder(data);
    }
  }, [data]);

  // update order status
  const [updateOrderStatus, { data: updatedOrder }] =
    useUpdateOrderStatusMutation();

  useEffect(() => {
    if (updatedOrder?._id) {
      setOrder(updatedOrder);

      if (updatedOrder?.status === "rejected") {
        toast.error("Order rejected successfully");
      }

      if (updatedOrder?.status === "progress") {
        toast.success("Order approve successfully");
      }

      if (updatedOrder?.status === "completed") {
        toast.success("Order completed successfully");
      }
    }
  }, [updatedOrder]);

  const updateOrderStatusHandler = (status) => {
    updateOrderStatus({ orderId: order?._id, status });
  };

  console.log("order?.conversation", order?.conversation);
  return (
    <main className="bg-[#F5F7F9] py-[60px]">
      <div className="container mx-auto">
        {isLoading && <span>Loading...</span>}
        {!isLoading && order?._id && (
          <div className="flex justify-between gap-12">
            <div className="w-[75%] bg-white py-5 px-6 rounded-md border shadow-md">
              <Inbox
                order={order}
                conversationId={order?.conversation}
                user={user}
                updateOrderStatus={updateOrderStatusHandler}
                deliveryBox={deliveryBox}
                setDeliveryBox={setDeliveryBox}
              />
            </div>
            <div className="w-[25%]">
              <div className="bg-white border rounded-md h-fit shadow-md">
                <h3 className="px-5 py-4 text-lg border-b">
                  Order Information
                </h3>

                <div className="p-5">
                  <div className="flex gap-3 pb-5 border-b">
                    <img
                      className="h-[80px] rounded-md"
                      src={`${process.env.REACT_APP_SERVER_URL}${order?.service?.serviceImages[1]}`}
                      alt="service"
                    />
                    <div>
                      <h4 className="text-sm font-semibold mb-1">
                        {order?.service?.title}
                      </h4>
                      <button className="py-1 px-2 block text-xs font-bold rounded bg-purple-700 text-white">
                        {order?.status?.toUpperCase()}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 py-6">
                    <li className="flex items-center justify-between">
                      <span className="text-[15px] text-[#95979d] font-medium">
                        Ordered by
                      </span>
                      {user?.role === "user" ? (
                        <span className="text-[15px] font-semibold">You</span>
                      ) : (
                        <span className="text-[15px] text-primary font-semibold">
                          <Link to={`/profile/${order?.user?._id}`}>
                            {order?.user?.email?.replace("@gmail.com", "")}
                          </Link>
                        </span>
                      )}
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-[15px] text-[#95979d] font-medium">
                        Delivery date
                      </span>
                      <span className="text-[15px] font-semibold">
                        Oct 9, 1:07 AM
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-[15px] text-[#95979d] font-medium">
                        Total price
                      </span>
                      <span className="text-[15px] font-semibold">
                        ${order?.packagePrice}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-[15px] text-[#95979d] font-medium">
                        Package
                      </span>
                      <span className="text-[15px] font-semibold">
                        {order?.packageName}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-[15px] text-[#95979d] font-medium">
                        Order number
                      </span>
                      <span className="text-[15px] font-semibold">
                        #{order?._id}
                      </span>
                    </li>
                  </div>

                  {user?.role === "admin" && order?.status !== "completed" && (
                    <div>
                      <button
                        className="text-white bg-primary px-8 py-3 rounded-[4px] gap-[5px] font-semibold transition hover:bg-primary/70 border border-primary block w-full text-center"
                        onClick={() => setDeliveryBox(true)}
                      >
                        <span>Delivery Now</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default OrderView;
