import { TQueryParams, TResponseRedux, TSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRegistaredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SemesterRegistration"],
    }),
    getAllRegistaredSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params,
        };
      },
      providesTags: ["SemesterRegistration"],
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    updateRegistaredSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args._id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["SemesterRegistration"],
    }),
  }),
});

export const { useAddRegistaredSemesterMutation, useGetAllRegistaredSemesterQuery, useUpdateRegistaredSemesterMutation } = courseManagementApi;
