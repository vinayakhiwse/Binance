import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: "",
};

const countrySlice = createSlice({
  name: "Country",
  initialState,
  reducers: {
    countryAuth: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const { countryAuth } = countrySlice.actions;
export default countrySlice;
