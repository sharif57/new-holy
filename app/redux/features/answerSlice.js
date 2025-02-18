import baseApi from "../api/baseApi";

export const answerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    answerPost: builder.mutation({
      query: (data) => ({
        url: "/answer/create",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    getAllAns: builder.query({
      query: (_id) => {
     
        return {
          url: `/answer/get-all-answer/${_id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
      },
      providesTags: ["Answer"], // Marks the fetched data with the "Answer" tag
    }),
    
  }),
});

export const { useAnswerPostMutation ,useGetAllAnsQuery} = answerApi;
