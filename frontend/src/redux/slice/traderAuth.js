import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const traderSlice = createSlice({
  name: "Trader",
  initialState,
  reducers: {
    traderAuth: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { traderAuth } = traderSlice.actions;
export default traderSlice;
