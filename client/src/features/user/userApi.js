import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/api/users",
    }),
    getUserById: builder.query({
      query: (userId) => `/api/users/${userId}`,
      providesTags: ["getUser"],
    }),
    updateProfile: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/api/users/profile/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["getUser"],
    }),
    updateProfilePic: builder.mutation({
      query: ({ userId, profilePic }) => ({
        url: `api/users/profile/profile-pic/${userId}`,
        method: "PATCH",
        body: { profilePic },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useUpdateProfilePicMutation,
} = userApi;
