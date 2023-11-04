import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => `/api/orders`,
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `/api/orders`,
        method: "POST",
        body: data,
      }),
    }),
    getOrdersByUser: builder.query({
      query: ({ id, status }) => `/api/orders/${id}/${status}`,
    }),
    getOrder: builder.query({
      query: (id) => `/api/orders/${id}`,
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/api/orders/${orderId}/${status}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrdersByUserQuery,
  useGetOrderQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
