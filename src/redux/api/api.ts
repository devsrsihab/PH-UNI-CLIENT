import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();
        if (priority) {
          params.append("priority", priority);
        }

        return {
          url: "/todos",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["todos"],
    }),

    addTodos: builder.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todos"],
    }),

    updateIsCompletedTodos: builder.mutation({
      query: (payload) => ({
        url: `/todos/${payload.id}`,
        method: "PUT",
        body: payload.data,
      }),
      invalidatesTags: ["todos"],
    }),


  }),
});

export const { useGetTodosQuery, useAddTodosMutation, useUpdateIsCompletedTodosMutation } = baseApi;
