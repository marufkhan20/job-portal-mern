import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../../components/admin/Inbox/ChatBox";
import InboxSideBar from "../../components/admin/Inbox/InboxSideBar";
import { useGetAllInboxConversationQuery } from "../../features/conversation/conversationApi";

const Inbox = () => {
  const { conversationId } = useParams() || {};
  console.log(conversationId);
  const [conversations, setConversations] = useState([]);

  // get all conversations
  const { data } = useGetAllInboxConversationQuery();

  useEffect(() => {
    if (data?.length > 0) {
      setConversations(data);
    }
  }, [data]);
  return (
    <main className="bg-[#F4F5F7]">
      <div className="min-h-[838px] py-14 px-10 flex justify-between gap-10 w-[80%] mx-auto">
        {/* sidebar */}
        <InboxSideBar conversations={conversations} />

        <div className="w-[70%] bg-white rounded-xl overflow-hidden">
          {conversationId ? (
            <ChatBox conversationId={conversationId} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg font-medium">
                Please Select User For Conversation.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Inbox;
