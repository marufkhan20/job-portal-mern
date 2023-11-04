import { apiSlice } from "../api/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => `/api/reviews`,
    }),
    getReviewsByServiceId: builder.query({
      query: (serviceId) => `/api/reviews/service-reviews/${serviceId}`,
    }),
    getReviewByOrderId: builder.query({
      query: (orderId) => `/api/reviews/${orderId}`,
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `/api/reviews`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewsByServiceIdQuery,
  useCreateReviewMutation,
  useGetReviewByOrderIdQuery,
} = reviewApi;
