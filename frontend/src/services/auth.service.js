import {
  registerUserApi,
  loginUserApi,
  logoutUserApi,
  getCurrentUserApi,
  refreshTokenApi,
} from "../api/auth.api";

export const registerUser = async (userData) => {
  return await registerUserApi(userData);
};

export const loginUser = async (credentials) => {
  return await loginUserApi(credentials);
};

export const logoutUser = async () => {
  return await logoutUserApi();
};

export const getCurrentUser = async () => {
  return await getCurrentUserApi();
};

export const refreshToken = async () => {
  return await refreshTokenApi();
};
