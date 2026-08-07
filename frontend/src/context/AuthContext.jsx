import { createContext, useEffect, useState } from "react";

import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from "../services/auth.service";

import { handleApiError } from "../utils/errorHandler";
import { authEvents } from "../utils/authEvents";
import { notify } from "../utils/toast";

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

      const apiError = handleApiError(error);

      if (apiError.status !== 401 && apiError.status < 500) {
        console.error(apiError);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();

    const unsubscribe = authEvents.subscribe((event) => {
      if (event === "SESSION_EXPIRED") {
        setUser(null);
        setIsAuthenticated(false);
        notify.warning("Session expired. Please sign in again.");
      }
    });

    return () => unsubscribe();
  }, []);

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);

      setUser(response.data);

      setIsAuthenticated(true);

      return response;
    } catch (error) {
      throw handleApiError(error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);

      setUser(response.data);

      setIsAuthenticated(true);

      return response;
    } catch (error) {
      throw handleApiError(error);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();

      setUser(null);

      setIsAuthenticated(false);
    } catch (error) {
      throw handleApiError(error);
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
