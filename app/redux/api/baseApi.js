// "use client"; // Ensures this file is used only on the client

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.10.199:5002/api/v1" }),
//   tagTypes: ["Question", "Notification", "AboutUs", "Privacy", "Terms"],
//   endpoints: () => ({}),
// });

// export default baseApi;

"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.199:5002/api/v1", // Base URL for API requests
  }),
  tagTypes: [
    "Question",
    "Package",
    "Room",
    "User"
  ], // Declare global tag types
  endpoints: () => ({}), // To be extended by individual services
});

export default baseApi;
