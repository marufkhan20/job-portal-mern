import { apiSlice } from "../api/apiSlice";

export const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllInboxConversation: builder.query({
      query: () => `/api/conversations/all-inbox`,
    }),
    getConversation: builder.query({
      query: ({ conversationId, orderId }) =>
        `/api/conversations/${conversationId}/${orderId}`,
    }),
    getConversationById: builder.query({
      query: (conversationId) => `/api/conversations/${conversationId}`,
    }),
    getInboxConversation: builder.query({
      query: () => `/api/conversations/conversation-inbox`,
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `/api/conversations/send-message`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllInboxConversationQuery,
  useGetConversationQuery,
  useGetConversationByIdQuery,
  useGetInboxConversationQuery,
  useSendMessageMutation,
} = conversationApi;
