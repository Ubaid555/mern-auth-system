import { createContext, useEffect, useState } from "react";

import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from "../services/auth.service";

import { ApiError } from "../utils/apiError";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loadUser = async () => {
  try {
    const response = await getCurrentUser();

    setUser(response.data);
    setIsAuthenticated(true);
  } catch (error) {
    setUser(null);
    setIsAuthenticated(false);

    const apiError = new ApiError(error);

    if (apiError.status !== 401) {
      console.error(apiError);
    }
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadUser();
  }, []);

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);

      setUser(response.data);

      setIsAuthenticated(true);

      return response;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);

      setUser(response.data);

      setIsAuthenticated(true);

      return response;
    } catch (error) {
      throw new ApiError(error);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();

      setUser(null);

      setIsAuthenticated(false);
    } catch (error) {
      throw new ApiError(error);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,

    login,
    logout,
    register,

    loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
