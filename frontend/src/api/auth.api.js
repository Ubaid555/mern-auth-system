import publicApi from "./publicApi";
import privateApi from "./privateApi";

export const registerUserApi = async (userData) => {
  const response = await publicApi.post("/auth/register", userData);
  return response.data;
};

export const loginUserApi = async (credentials) => {
  const response = await publicApi.post("/auth/login", credentials);
  return response.data;
};

export const refreshTokenApi = async () => {
  const response = await publicApi.post("/auth/refresh-token");
  return response.data;
};

export const logoutUserApi = async () => {
  const response = await privateApi.post("/auth/logout");
  return response.data;
};

export const getCurrentUserApi = async () => {
  const response = await privateApi.get("/auth/me");
  return response.data;
};

