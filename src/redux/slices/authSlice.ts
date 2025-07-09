import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated:
    localStorage.getItem("isAuthenticated") === "true" || true ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const AuthSelector = (state: { auth: AuthState }) => state.auth;

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
