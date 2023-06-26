import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const userSlice = createSlice({
  name: "productManageMode", //This is the name of the state
  initialState,
  reducers: {
    SetCreationMode: (state, action) => {
      state.value = action.payload;
      console.log(`Reducer's mode = ${state.value.toString()}`);
    },
  },
});

export const { SetCreationMode } = userSlice.actions;
export default userSlice.reducer;
