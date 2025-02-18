import baseApi from "../api/baseApi";

export const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    
    questionPost: builder.mutation({
      query: (body) => ({
        url: "/request/create",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Question","Room"],
    }),

    // Query to fetch all questions
    questionGetAll: builder.query({
      query: () => ({
        url: "/request/get-recent",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Question"],
    }),

    previous: builder.query({
      query: () => ({
        url: "/request/get-all",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Question"],
    }),


    allHistory: builder.query({
      query: () => ({
        url: "/request/get-req-history",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Question"],
    }),

    requestAllRoomData: builder.query({
      query: (_id) => ({
        url: `/request/get-all/${_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Question"], // Marks the fetched data with the "Question" tag
    }),




  }),
});

export const {
  useQuestionPostMutation,
  useQuestionGetAllQuery,
  // useGetSingleQuestionQuery,
  useRequestAllRoomDataQuery,
  usePreviousQuery,
  useAllHistoryQuery,
  
} = questionApi;
