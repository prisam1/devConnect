import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  _id?: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  links: string[];
}

const initialState: UserState = {
  _id: "",
  username: "",
  email: "",
  avatar: "",
  bio: "",
  links: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUserDetails: () => {
      return initialState;
    },
    updateUserDetail: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const UserSelector = (state: { user: UserState }) => state.user;
export const { setUserDetails, clearUserDetails, updateUserDetail } =
  userSlice.actions;
export default userSlice.reducer;
