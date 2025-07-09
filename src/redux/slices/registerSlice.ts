import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  links: string[];
}

const initialState: RegisterState = {
  _id: "",
  username: "",
  email: "",
  avatar: "",
  bio: "",
  links: []
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterDetails: (state, action: PayloadAction<RegisterState>) => {
      return { ...state, ...action.payload };
    },
    resetRegisterDetails: () => {
      return initialState;
    },
  },
});

export const RegisterSelector = (state: { register: RegisterState }) =>
  state.register;
export const { setRegisterDetails, resetRegisterDetails } =
  registerSlice.actions;
export default registerSlice.reducer;
