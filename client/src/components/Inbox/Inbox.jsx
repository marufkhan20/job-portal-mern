/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { io } from "socket.io-client";
import {
  useGetConversationQuery,
  useSendMessageMutation,
} from "../../features/conversation/conversationApi";
import { useGetReviewByOrderIdQuery } from "../../features/review/reviewApi";
import AddReview from "../Reviews/AddReview";
import FileView from "./FileView";
import Message from "./Message";
import SendMessage from "./SendMessage";

const Inbox = ({
  order,
  conversationId,
  user,
  updateOrderStatus,
  deliveryBox,
  setDeliveryBox,
}) => {
  const [conversation, setConversation] = useState({});
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState({});
  const [projectLink, setProjectLink] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [review, setReview] = useState({});
  const [messagesLength, setMessagesLength] = useState(0);
  const audio = new Audio("/sound/message.mp3");

  console.log(onlineUsers);

  // socket
  const socket = io("http://localhost:5000", {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttempts: 10,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });

  // Connect to Socket.io
  useEffect(() => {
    socket.emit("new-user-add", user.userId);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // get conversation
  const { data } = useGetConversationQuery(
    {
      conversationId,
      orderId: order?._id,
    },
    {
      pollingInterval: 5000,
    }
  );

  useEffect(() => {
    if (data?._id) {
      if (
        data?.messages?.length > messagesLength &&
        data?.messages[data?.messages?.length - 1]?.receiver === user?.userId
      ) {
        audio.play();
      }
      setConversation(data);
      setMessagesLength(data?.messages?.length);
    }
  }, [data]);

  // get review
  const { data: newReview } = useGetReviewByOrderIdQuery(order?._id);

  useEffect(() => {
    if (newReview?._id) {
      setReview(newReview);
    }
  }, [newReview]);

  // capture files
  const captureFile = (e) => {
    let files = e.target.files;
    files = [...files];

    setFileName(files[0].name);

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setFile(reader.result);
    };
  };

  // send message
  const [sendMessage, { data: newMessage }] = useSendMessageMutation();

  useEffect(() => {
    if (newMessage?._id) {
      if (newMessage?.link) {
        toast.success("Project Delivered Success");
        setDeliveryBox(false);
      }

      const updatedConversation = { ...conversation };
      updatedConversation.messages = [
        ...updatedConversation.messages,
        newMessage,
      ];

      setConversation(updatedConversation);
      setMessage("");
      setFileName("");
      setFile("");

      // send message to socket
      socket.emit("send-message", newMessage);
    }
  }, [newMessage]);

  useEffect(() => {
    if (receivedMessage?._id) {
      // if (receivedMessage?.receiver === user?.userId) {
      //   const updatedConversation = { ...conversation };
      //   updatedConversation.messages = [...updatedConversation?.messages, data];
      //   setConversation(updatedConversation);
      // }
    }
  }, [receivedMessage]);

  useEffect(() => {
    console.log("conversation", conversation);
    // receive message from socket
    socket.on("recieve-message", (dataMessage) => {
      console.log("data", dataMessage);
      setReceivedMessage(dataMessage);
      if (data?.receiver === user?.userId) {
      }
    });
  }, []);

  const handleSendMessage = () => {
    sendMessage({ message, orderId: order?._id, file, fileName });
  };

  // delivery project
  const deliveredProject = (e) => {
    e.preventDefault();

    if (projectLink && projectDesc) {
      updateOrderStatus("delivered");

      sendMessage({
        message: projectDesc,
        link: projectLink,
        orderId: order?._id,
        type: "orderDelevered",
      });
    }
  };

  const stars = [];

  for (let i = 0; i < review?.rating; i++) {
    stars.push(<AiFillStar />);
  }
  return (
    <div>
      <div className="flex flex-col gap-8">
        {conversation?.messages?.map((message) => {
          if (
            message?.type === "orderPlace" &&
            order?.status === "pending" &&
            user?.role === "admin"
          ) {
            return (
              <Message
                message={message}
                profilePic={user?.profilePic}
                user={message?.sender === user?.userId ? "me" : "another"}
                type="orderPlace"
                updateOrderStatus={updateOrderStatus}
              />
            );
          } else if (
            message?.type === "orderDelevered" &&
            order?.status === "delivered" &&
            user?.role === "user"
          ) {
            return (
              <Message
                message={message}
                profilePic={user?.profilePic}
                user={message?.sender === user?.userId ? "me" : "another"}
                type="orderDelivered"
                updateOrderStatus={updateOrderStatus}
              />
            );
          } else {
            return (
              <Message
                message={message}
                profilePic={user?.profilePic}
                user={message?.sender === user?.userId ? "me" : "another"}
              />
            );
          }
        })}
      </div>

      {/* review */}
      {order?.status === "completed" &&
        !review?._id &&
        user?.role === "user" && (
          <div className="mt-5">
            <h3 className="mb-2">Please Give Review</h3>
            <AddReview
              order={order?._id}
              service={order?.service?._id}
              setReview={setReview}
            />
          </div>
        )}

      {/* show review */}
      {review?._id && (
        <div className="bg-white border rounded-md py-6 px-5 mt-5">
          <div className="flex gap-5">
            <div className="w-full">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-orange-300 font-bold">
                  {stars}
                  <span>{review?.rating}</span>
                </div>
              </div>
              <p className="mt-2 font-medium">{review?.description}</p>
            </div>
          </div>
        </div>
      )}

      {order?.status !== "completed" && (
        <>
          <div className="mt-10 border-t py-5">
            <h4 className="mb-5">Write Your Message</h4>
            <SendMessage
              setMessage={setMessage}
              message={message}
              handleSendMessage={handleSendMessage}
              captureFile={captureFile}
            />
          </div>
          {fileName && <FileView file={file} fileName={fileName} />}
          <div
            className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/40 flex items-center transition-all duration-300 justify-center ${
              deliveryBox ? "scale-100" : "scale-0"
            } `}
          >
            <div className="bg-white rounded-md min-w-[600px] overflow-hidden">
              <h3 className="text-[17px] font-semibold bg-[#F8F8F8] px-4 py-3">
                Delivery Your Work
              </h3>
              <form onSubmit={deliveredProject}>
                <div className="px-4 mt-3">
                  <label htmlFor="workLink" className="font-bold text-sm">
                    Project Link
                  </label>
                  <input
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                    id="workLink"
                    type="url"
                    placeholder="Enter Your Project Link"
                    required
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                  />
                  {/* {errors?.methodName && (
                <p className="mt-2 text-red-600">{errors?.methodName}</p>
              )} */}
                </div>
                <div className="px-4 mt-3">
                  <label htmlFor="details" className="font-bold text-sm">
                    Describe
                  </label>
                  <textarea
                    className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3 h-28"
                    id="details"
                    type="text"
                    placeholder="Enter Your Project Details."
                    required
                    value={projectDesc}
                    onChange={(e) => setProjectDesc(e.target.value)}
                  />
                  {/* {errors?.paymentDetails && (
                <p className="mt-2 text-red-600">{errors?.paymentDetails}</p>
              )} */}
                </div>
                <div className="flex items-center gap-2 p-4 justify-end">
                  <button
                    type="submit"
                    className="text-sm font-medium py-[8px] px-[14px] rounded-[4px] outline-none bg-[#3085D6] block text-white hover:bg-[#3085D6]/60"
                  >
                    Delivery Now
                  </button>
                  <div
                    className="text-sm font-medium py-[8px] px-[14px] rounded-[4px] outline-none bg-[#DD3333] block text-white hover:bg-[#DD3333]/60 cursor-pointer"
                    onClick={() => {
                      setDeliveryBox(false);
                    }}
                  >
                    Cancel
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Inbox;
