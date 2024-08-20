import { TQueryParams, TResponseRedux, TStudent } from "../../../types";
import { TFaculty } from "../../../types/faculty.type";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // all get routes
    getSingleStudent: builder.query({
      query: (id) => ({
        url: `/students/${id}`,
        method: "GET",
      }),
    }),
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/faculties",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAllStudent: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // all post routes
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  // all get hooks
  useGetAllStudentQuery,
  useGetSingleStudentQuery,
  useGetAllFacultiesQuery,

  // all post hooks
  useAddStudentMutation,
  useChangePasswordMutation,
} = userManagementApi;
