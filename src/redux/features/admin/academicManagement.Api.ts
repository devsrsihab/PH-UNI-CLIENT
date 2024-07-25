import {
  TAcademicSemester,
  TQueryParams,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters",
        method: "POST",
        body: data,
      }),
    }),
    getAllSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties",
        method: "POST",
        body: data,
      }),
    }),
    getAllAcademicFaculties: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
    }),
    getSingleAcademicFacultie: builder.query({
      query: (id) => ({
        url: `/academic-faculties/${id}`,
        method: "GET",
      }),
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments",
        method: "POST",
        body: data,
      }),
    }),
    getAllAcademicDepartment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/academic-departments",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useAddAcademicSemesterMutation,
  useGetAllSemesterQuery,
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultiesQuery,
  useGetSingleAcademicFacultieQuery,
  useAddAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery,
} = academicManagementApi;
