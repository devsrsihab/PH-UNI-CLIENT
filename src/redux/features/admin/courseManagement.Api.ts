import {
  TCourse,
  TQueryParams,
  TResponseRedux,
  TSemester,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // all get queries
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
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["Courses"],
      transformResponse: (response: TResponseRedux<TCourse>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
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
      providesTags: ["Courses"],
      transformResponse: (response: TResponseRedux<TCourse>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getCourseFaculty: builder.query({
      query: (id) => ({ url: `courses/${id}/getfaculties`, method: "GET" }),
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),

    // all post query
    addRegistaredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SemesterRegistration"],
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Courses"],
    }),
    addFacultiesInCourse: builder.mutation({
      query: (args) => ({
        url: `courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
    }),
    updateRegistaredSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args._id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["SemesterRegistration"],
    }),
    addOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "offered-courses/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  // all get hoos
  useGetAllCoursesQuery,
  useGetAllRegistaredSemesterQuery,
  useGetAllFacultiesQuery,
  useGetCourseFacultyQuery,
  // all post hooks
  useAddOfferedCourseMutation,
  useAddFacultiesInCourseMutation,
  useAddRegistaredSemesterMutation,
  useUpdateRegistaredSemesterMutation,
  useAddCourseMutation,
} = courseManagementApi;
