import baseApi from "../api/baseApi";

export const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackage: builder.query({
      query: () => ({
        url: "/package/get-all-packages",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Package"],
    }),

    packagePost: builder.mutation({
      query: (body) => ({
        url: "/subscription/check-out",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Package"],
    }),

    subscription: builder.query({
      query: () => ({
        url: "/subscription/get-all",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Package"],
    }),

  }),
});

export const { useGetAllPackageQuery, usePackagePostMutation, useSubscriptionQuery } = packageApi;
