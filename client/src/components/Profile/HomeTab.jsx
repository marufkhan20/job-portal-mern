import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrdersByUserQuery } from "../../features/order/orderApi";

const HomeTab = ({ userInfo }) => {
  const [skip, setSkip] = useState(true);

  // get orders
  const { data: orders } = useGetOrdersByUserQuery(
    {
      id: userInfo?._id,
    },
    {
      skip,
    }
  );

  useEffect(() => {
    if (userInfo?._id) {
      setSkip(false);
    }
  }, [userInfo]);
  return orders?.length > 0 ? (
    orders?.map((order) => (
      <div className="p-5 bg-white shadow-sm mt-6 rounded-md flex items-center gap-3">
        {console.log(order)}
        <img
          className="w-[180px] h-[120px] rounded-md"
          src={`${process.env.REACT_APP_SERVER_URL}${order?.service?.serviceImages[1]}`}
          alt="service"
        />
        <div className="w-full">
          <div className="flex items-center justify-between gap-5 w-full mb-3">
            <h4 className="text-lg font-semibold">{order?.service?.title}</h4>
            <h4 className="text-lg font-semibold">{order?.packageName}</h4>
            <h4 className="text-lg font-semibold">${order?.packagePrice}</h4>
          </div>
          <div className="flex items-center justify-between gap-5">
            <p className="text-black mb-3">Thu, Jun 30, 2022 4:30 AM</p>
            <h4>{order?.status?.toUpperCase()}</h4>
          </div>

          <Link
            to={`/order/inbox/${order?._id}/${order?.user}`}
            className="py-[10px] px-6 gap-2 transition bg-primary text-white rounded-md inline-block border border-primary hover:bg-transparent hover:text-primary font-medium
          "
          >
            <span>View Order</span>
          </Link>
        </div>
      </div>
    ))
  ) : (
    <span className="mt-5 block font-semibold">No Active Orders Found!</span>
  );
};

export default HomeTab;
