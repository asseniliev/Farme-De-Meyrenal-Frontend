import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const contourSlice = createSlice({
  name: "contour", //This is the name of the state
  initialState,
  reducers: {
    SetContour: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { SetContour } = contourSlice.actions;
export default contourSlice.reducer;