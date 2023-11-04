/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
// import { AiOutlineSend } from "react-icons/ai";
import { useEffect } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { MdSend } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  useGetInboxConversationQuery,
  useSendMessageMutation,
} from "../features/conversation/conversationApi";
import Message from "./Inbox/Message";

const ChatBox = () => {
  const { user } = useSelector((state) => state.auth || {});

  const [showChatBox, setShowChatBox] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState({});
  const [messagesLength, setMessagesLength] = useState(0);
  const audio = new Audio("/sound/message.mp3");

  // get conversation
  const { data } = useGetInboxConversationQuery(null, {
    skip: !showChatBox,
    pollingInterval: 500,
  });

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

  // send message
  const [sendMessage, { data: newMessage }] = useSendMessageMutation();

  useEffect(() => {
    if (newMessage?._id) {
      console.log(newMessage);
      const updatedConversation = { ...conversation };
      updatedConversation.messages = [
        ...updatedConversation?.messages,
        newMessage,
      ];

      setConversation(updatedConversation);
      setMessage("");
    }
  }, [newMessage]);

  const sendMessageHandler = (e) => {
    e.preventDefault();

    if (!message) return;

    sendMessage({ message });
  };
  return (
    <div>
      <div
        className={`w-[350px] h-[500px] transition-all duration-300 bg-white fixed bottom-10 ${
          showChatBox ? "right-36 scale-100" : "-right-[200%] scale-0"
        } z-50 rounded-xl shadow-2xl border overflow-hidden`}
      >
        <div className="flex items-center justify-between py-3 px-4 bg-[#4D525B] text-white">
          <h3 className="font-medium">Customer Support</h3>
          <div
            onClick={() => setShowChatBox(false)}
            className="text-xl p-[6px] transition-all cursor-pointer hover:bg-slate-500 rounded-full"
          >
            <IoMdClose />
          </div>
        </div>

        <div className="h-[370px] overflow-y-auto pt-7">
          <div className="px-5 flex flex-col gap-5 justify-end">
            {/* <div>
              <div className="flex items-center gap-2 justify-start flex-row-reverse w-full">
                <img
                  className="w-10 h-10 rounded-full block"
                  // src={`${process.env.REACT_APP_SERVER_URL}${profilePic}`}
                  src="/img/users/1.jpg"
                  alt="user"
                />
                <h3>You</h3>
                <span>-</span>
                <span className="text-gray-400 font-medium text-sm">
                  Sep 14, 1:06 AM
                </span>
              </div>
              <div className="mr-10 py-2 border rounded-md px-3 mt-2 text-right">
                <p>Hello</p>
              </div>
            </div> */}

            {conversation?.messages?.map((message) => (
              <Message
                key={message?._id}
                message={message}
                profilePic={user?.profilePic}
                user={message?.sender === user?.userId ? "me" : "another"}
                conversationType={conversation?.inbox}
              />
            ))}
          </div>
        </div>

        <form onSubmit={sendMessageHandler}>
          <div className="flex items-center mt-5 border mx-5 rounded-full bg-white px-2">
            <div className="w-10 pl-1 cursor-pointer">
              <GrAttachment />
            </div>
            <input
              className="py-2 w-full outline-none"
              placeholder="write text..."
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className={`transition w-10 flex items-center justify-center ${
                message && "text-primary"
              }`}
              disabled={!message}
            >
              {/* <AiOutlineSend /> */}
              <MdSend className="text-xl" />
            </button>
          </div>
        </form>
      </div>

      <div
        className="fixed bottom-10 right-10 rounded-full cursor-pointer"
        onClick={() => setShowChatBox(!showChatBox)}
      >
        <div className="box">
          <div className="icon bg-primary text-white  p-4">
            <BsChatDotsFill className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
