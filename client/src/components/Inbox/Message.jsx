/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../../features/user/userApi";

const Message = ({
  user,
  message,
  profilePic,
  type,
  updateOrderStatus,
  conversationType,
}) => {
  const { user: userData } = useSelector((state) => state.auth || {});

  // get receiver info
  const { data: sender } = useGetUserByIdQuery(message?.sender);
  return (
    <>
      {user === "another" && (
        <div>
          <div className="flex items-center gap-2">
            <img
              className="w-10 h-10 rounded-full block"
              src={`${process.env.REACT_APP_SERVER_URL}${sender?.profile?.profilePic}`}
              alt="user"
            />
            <h3>{`${sender?.profile?.firstName} ${sender?.profile?.lastName}`}</h3>
            <span>-</span>
            <span className="text-gray-400 font-medium text-sm">
              Sep 14, 1:06 AM
            </span>
          </div>
          <div
            className={`ml-10 ${
              conversationType && userData?.role !== "admin" ? "py-2" : "py-5"
            } border rounded-md px-3 mt-2 bg-light`}
          >
            <p>
              {type === "orderPlace"
                ? `${sender?.profile?.firstName} ${sender?.profile?.lastName} just placed an order. You can accept the order and start working. Again you can reject the order if you want.`
                : message?.message}
            </p>

            {message?.link && (
              <div className="mt-1 py-2 px-4 bg-green-600 rounded-md text-white font-bold">
                <a target="_blank" href={message?.link} rel="noreferrer">
                  {message?.link}
                </a>
              </div>
            )}

            {type === "orderPlace" && (
              <div className="flex items-center gap-2 justify-start">
                <button
                  type="submit"
                  class="text-xs flex items-center text-white bg-primary px-8 py-2 rounded-[4px] gap-[5px] font-medium transition hover:bg-primary/70 border border-primary mt-3"
                  onClick={() => updateOrderStatus("progress")}
                >
                  <span>Accept</span>
                </button>
                <button
                  type="submit"
                  class="text-xs flex items-center text-white bg-red-700 px-8 py-2 rounded-[4px] gap-[5px] font-medium transition hover:bg-red-700/70 border border-red-700 mt-3"
                  onClick={() => updateOrderStatus("rejected")}
                >
                  <span>Reject</span>
                </button>
              </div>
            )}

            {type === "orderDelivered" && (
              <div className="flex items-center gap-2 justify-start">
                <button
                  type="submit"
                  class="text-xs flex items-center text-white bg-primary px-8 py-2 rounded-[4px] gap-[5px] font-medium transition hover:bg-primary/70 border border-primary mt-3"
                  onClick={() => updateOrderStatus("completed")}
                >
                  <span>Accept</span>
                </button>
                <button
                  type="submit"
                  class="text-xs flex items-center text-white bg-red-700 px-8 py-2 rounded-[4px] gap-[5px] font-medium transition hover:bg-red-700/70 border border-red-700 mt-3"
                  onClick={() => updateOrderStatus("progress")}
                >
                  <span>Reject</span>
                </button>
              </div>
            )}

            {message?.fileName && (
              <div className="border p-4 rounded-md inline-block mt-5">
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}${message?.file}`}
                  alt="file"
                  className="w-[200px] h-[100px] rounded-md mx-auto"
                />
                <p className="mt-2 font-semibold text-primary">
                  <a
                    href={`${process.env.REACT_APP_SERVER_URL}${message?.file}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {message?.fileName}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {user === "me" && (
        <div>
          <div className="flex items-center gap-2 justify-start flex-row-reverse">
            <img
              className="w-10 h-10 rounded-full block"
              src={`${process.env.REACT_APP_SERVER_URL}${profilePic}`}
              alt="user"
            />
            <h3>You</h3>
            <span>-</span>
            <span className="text-gray-400 font-medium text-sm">
              Sep 14, 1:06 AM
            </span>
          </div>
          <div
            className={`mr-10 ${
              conversationType && userData?.role !== "admin" ? "py-2" : "py-5"
            } border rounded-md px-3 mt-2 text-right`}
          >
            <p>
              {message?.type === "orderPlace"
                ? `${message?.message} Awaiting for admin approval.`
                : message?.message}
            </p>

            {message?.link && (
              <div className="mt-1 py-2 px-4 bg-green-600 rounded-md text-white font-bold">
                <a target="_blank" href={message?.link} rel="noreferrer">
                  {message?.link}
                </a>
              </div>
            )}

            {message?.fileName && (
              <div className="border p-4 rounded-md inline-block mt-5">
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}${message?.file}`}
                  alt="file"
                  className="w-[200px] h-[100px] rounded-md mx-auto"
                />
                <p className="mt-2 font-semibold text-primary">
                  <a
                    href={`${process.env.REACT_APP_SERVER_URL}${message?.file}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {message?.fileName}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
