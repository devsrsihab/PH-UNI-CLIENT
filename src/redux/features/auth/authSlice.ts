import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthSTate = {
  user: null | TUser;
  token: null | string;
};
const initialState: TAuthSTate = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //*set user
    setuser: (state, action) => {
      const { user, token } = action.payload;
      (state.user = user), (state.token = token);
    },
    //*logout user
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setuser, logout } = authSlice.actions;
export default authSlice.reducer;
export const currentToken = (state: RootState) => state.auth.token;
export const currentUser = (state: RootState) => state.auth.user;
