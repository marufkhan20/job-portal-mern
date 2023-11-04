import { apiSlice } from "../api/apiSlice";

export const serviceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => `/api/services?limit=6`,
      providesTags: ["getServices"],
    }),
    getService: builder.query({
      query: (serviceId) => `/api/services/${serviceId}`,
    }),
    dublicateService: builder.query({
      query: (serviceId) => `/api/services/dublicate/${serviceId}`,
      invalidatesTags: ["getServices"],
    }),
    addService: builder.mutation({
      query: (data) => ({
        url: `/api/services`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getServices"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/api/services/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useGetServiceQuery,
  useDublicateServiceQuery,
  useAddServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
