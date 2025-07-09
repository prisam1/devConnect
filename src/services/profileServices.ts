import api from "../api/axios";
import { UpdateProfilePayload, UserType } from "../types";

  export const getProfile = async (): Promise<UserType> => {
    const res = await api.get<UserType>("/users/me");
    return res.data;
  };
  
  export const updateProfile = async (data: UpdateProfilePayload): Promise<UserType> => {
    const res = await api.put<UserType>("/users/me", data);
    return res.data;
  };
  