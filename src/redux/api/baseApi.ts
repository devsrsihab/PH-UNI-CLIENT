import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setuser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { TResponse } from "../../types";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1",

  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

//*base query with reference token
const baseQueryWithReferenceToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions) as TResponse<any>;
  const toastId = 3123213;

  if (result?.error?.status === 404) {
    toast.error("User not found", { id: toastId, duration: 1000 });
  }
  if (result?.error?.status === 403) {
    toast.error(result?.error?.data?.message, { id: toastId, duration: 1000 });
  }

  if (result.error?.status === 401) {
    console.log("sending refresh token");

    //*send the refresh token req
    const res = await fetch("http://localhost:8000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const { data } = await res.json();
    if (data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(setuser({ user, token: data?.accessToken }));
      result = (await baseQuery(args, api, extraOptions)) as TResponse<any>;
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["SemesterRegistration", "Courses"],
  baseQuery: baseQueryWithReferenceToken,
  endpoints: () => ({}),
});
