import baseApi from "../api/baseApi";

export const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    recentRoom: builder.query({
      query: () => ({
        url: "/room/get-recent-rooms",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Room"],
    }),

    allRoom: builder.query({
      query: () => ({
        url: "/room/get-all-rooms",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Room"],
    }),

    recentGetForAll: builder.query({
      query: () => ({
        url: "/request/get-for-all",
        method: "GET",
        providesTags: ["Room"],
      }),
    }),
  }),
});

export const { useRecentRoomQuery, useAllRoomQuery , useRecentGetForAllQuery} = roomApi;
