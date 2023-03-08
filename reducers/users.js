import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    deliveryAddress: {
      lat: 0,
      lon: 0,
      address: "",
      city: "",
    },
    accesstoken: "",
  },
};

export const userSlice = createSlice({
  name: "user", //This is the name of the state
  initialState,
  reducers: {
    SetDeliveryAddress: (state, action) => {
      state.value.deliveryAddress.lat = action.payload.lat;
      state.value.deliveryAddress.lon = action.payload.lon;
      state.value.deliveryAddress.address = action.payload.address;
      state.value.deliveryAddress.city = action.payload.city;
      // console.log("State: ");
      // console.log(state.value);
    },
    SetCredentials: (state, action) => {
      state.value.id = action.payload.id;
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
      // console.log("State: ");
      // console.log(state.value);
    },
    setPersonalData: (state, action) => {
      state.value.firstName = action.payload.firstName;
      state.value.lastName = action.payload.lastName;
      state.value.phoneNumber = action.payload.phoneNumber;
      // console.log("State: ");
      // console.log(state.value);
    },
    resetPersonalData: (state) => {
      state.value = initialState.value;
    },
    setLoggedUser: (state, action) => {
      state.value = action.payload;
      console.log("State logged user");
      console.log(state.value);
    },
  },
});

export const {
  SetDeliveryAddress,
  SetCredentials,
  setPersonalData,
  resetPersonalData,
  setLoggedUser,
} = userSlice.actions;
export default userSlice.reducer;
