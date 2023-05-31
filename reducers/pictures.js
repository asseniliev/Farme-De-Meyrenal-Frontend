import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    uri: null,
  },
};

export const userSlice = createSlice({
  name: "picture", //This is the name of the state
  initialState,
  reducers: {
    SetPicture: (state, action) => {
      state.value.uri = action.payload;
    },
    ClearPicture: (state) => {
      state.value.uri = null;
    },
  },
});

export const { SetPicture, ClearPicture } = userSlice.actions;
export default userSlice.reducer;
