import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const userSlice = createSlice({
  name: "productData", //This is the name of the state
  initialState,
  reducers: {
    StoreProductData: (state, action) => {
      state.value = action.payload;
    },

    ClearProductData: (state) => {
      state.value = null;
    },
  },
});

export const { StoreProductData, ClearProductData } = userSlice.actions;
export default userSlice.reducer;
