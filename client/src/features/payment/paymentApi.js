import { apiSlice } from "../api/apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentMethods: builder.query({
      query: () => `/api/payment-methods`,
      providesTags: ["getPaymentMethods"],
    }),
    getActivePaymentMethods: builder.query({
      query: () => `/api/payment-methods/active`,
    }),
    addNewPayment: builder.mutation({
      query: (data) => ({
        url: `/api/payment-methods`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getPaymentMethods"],
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/api/payment-methods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getPaymentMethods"],
    }),
    updatePayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/payment-methods/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["getPaymentMethods"],
    }),
  }),
});

export const {
  useGetPaymentMethodsQuery,
  useGetActivePaymentMethodsQuery,
  useAddNewPaymentMutation,
  useDeletePaymentMutation,
  useUpdatePaymentMutation,
} = paymentApi;
