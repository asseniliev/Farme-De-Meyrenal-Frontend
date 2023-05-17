import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isCreateMode: null,
  },
};

export const userSlice = createSlice({
  name: "productManageMode", //This is the name of the state
  initialState,
  reducers: {
    SetCreationMode: (state, action) => {
      state.value.isCreateMode = action.payload;
    },
  },
});

export const { SetCreationMode } = userSlice.actions;
export default userSlice.reducer;
