"use client"; // Ensures this file is used only on the client

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://159.89.186.224:5002/api/v1";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken"); // Access localStorage safely
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/user/create-user",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    // resetPassword: builder.mutation({
    //   query: (data) => {
    //     if (typeof window !== "undefined") {
    //       const token = sessionStorage.getItem("verifyToken"); // Access sessionStorage safely
    //       return {
    //         url: "/auth/reset-password",
    //         method: "POST",
    //         body: data,
    //         headers: {
    //           Authorization: `Bearer ${data.token}`,
    //         },
    //       };
    //     }
    //   },
    // }),
    resetPassword: builder.mutation({
      query: (data) => {
        if (typeof window !== "undefined") {
          // Safely fetch the token from sessionStorage
          const token = localStorage.getItem('Authorization');
          console.log(token,'dsd')
          console.log(data,'data')
          if (!token) {
            throw new Error("No token found. Please verify your email again.");
          }
          return {
              url: `/auth/reset-password`,
              method: 'POST',
              body: data,
              headers: {
                  Authorization: token ? token : '', 
              },
          };
        }
        throw new Error("Unable to access sessionStorage.");
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
} = authApi;
