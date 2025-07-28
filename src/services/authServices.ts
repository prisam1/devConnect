import api from "../api/axios";
import { LoginCredentials, LoginResponse, SignUpCredentials, SignUpResponse } from "../types";

export const signUp = async (credentials: SignUpCredentials): Promise<SignUpResponse> => {
  const response = await api.post<SignUpResponse>("/auth/signup", credentials);
  return response.data;
};

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials); 
  return response.data;
};
