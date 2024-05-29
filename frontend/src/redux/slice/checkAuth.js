import { createSlice } from "@reduxjs/toolkit";

// Helper function to check authentication based on token
const CheckAuthentication = () => {
  const token = localStorage.getItem("token");
  return {
    isAuthenticated: Boolean(token),
  };
};

const initialState = CheckAuthentication();

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    checkAuth: (state) => {
      state.isAuthenticated = CheckAuthentication().isAuthenticated;
    },
  },
});

export const { checkAuth } = authSlice.actions;
export default authSlice;
