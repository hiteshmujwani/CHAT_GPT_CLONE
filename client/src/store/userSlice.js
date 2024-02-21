import { createSlice } from "@reduxjs/toolkit";

let auth = {
  user: null,
  token: "",
};

const alreadyUser = localStorage.getItem("auth");
if (alreadyUser) {
  auth = JSON.parse(alreadyUser);
}

export const userSlice = createSlice({
  name: auth,
  initialState: auth,
  reducers: {
    addUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        })
      );
    },
  },
});

export default userSlice.reducer;
export const { addUser } = userSlice.actions;
