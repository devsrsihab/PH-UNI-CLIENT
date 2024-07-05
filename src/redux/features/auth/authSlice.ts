import { createSlice } from "@reduxjs/toolkit";

type TAuthSTate = {
  user: null | object;
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
