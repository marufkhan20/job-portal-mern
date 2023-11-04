/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";
import { useSelector } from "react-redux";
import {
  useGetConversationByIdQuery,
  useSendMessageMutation,
} from "../../../features/conversation/conversationApi";
import Message from "../../Inbox/Message";

const ChatBox = ({ conversationId }) => {
  const { user } = useSelector((state) => state.auth || {});
  const [conversation, setConversation] = useState({});
  const [message, setMessage] = useState("");
  const [messagesLength, setMessagesLength] = useState(0);
  const audio = new Audio("/sound/message.mp3");

  const { data } = useGetConversationByIdQuery(conversationId, {
    pollingInterval: 500,
  });

  useEffect(() => {
    if (data?._id) {
      setConversation(data);
      if (
        data?.messages?.length > messagesLength &&
        data?.messages[data?.messages?.length - 1]?.receiver === user?.userId
      ) {
        audio.play();
      }
      setMessagesLength(data?.messages?.length);
    }
  }, [data]);

  // send message
  const [sendMessage, { data: newMessage }] = useSendMessageMutation();

  useEffect(() => {
    if (newMessage?._id) {
      const updatedConversation = { ...conversation };
      updatedConversation.messages = [
        ...updatedConversation.messages,
        newMessage,
      ];

      setConversation(updatedConversation);
      setMessage("");
    }
  }, [newMessage]);

  const sendMessageHandler = (e) => {
    e.preventDefault();

    if (!message) return;

    sendMessage({ message, conversationId });
  };
  return (
    <div>
      <div className="flex items-center justify-between py-5 px-7 shadow-sm">
        <div>
          <h2 className="text-lg font-medium m-0">Md Maruf</h2>
          <span className="text-sm text-[#9299b8]">United State</span>
        </div>
        <BsThreeDotsVertical className="text-[#666d8d] cursor-pointer text-lg" />
      </div>

      <div className="px-5 mt-5 flex flex-col gap-8 h-[500px] overflow-y-auto">
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

      <form onSubmit={sendMessageHandler}>
        <div className="flex items-center justify-between gap-3 px-5 mt-8">
          <input
            className="w-[90%] bg-[#F4F5F7] outline-none px-10 py-5 font-medium block rounded-full"
            placeholder="Write message..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="w-11 h-11 rounded-full bg-[#F4F5F7] flex items-center justify-center">
            <ImAttachment className="text-[#adb4d2]" />
          </div>
          <button
            type="submit"
            className="w-11 h-11 rounded-full bg-primary cursor-pointer flex items-center justify-center text-white"
          >
            <FiSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
