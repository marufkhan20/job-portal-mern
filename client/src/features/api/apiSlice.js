import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://trusted-tools-backend-production.up.railway.app",
  baseUrl: process.env.REACT_APP_SERVER_URL,
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      // api.dispatch(userLoggedOut());
      localStorage.clear();
    }
    return result;
  },
});

// create api slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://trusted-tools-backend-production.up.railway.app",
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = getState()?.auth?.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["getUser", "getServices", "getPaymentMethods"],
  endpoints: (builder) => ({}),
});
