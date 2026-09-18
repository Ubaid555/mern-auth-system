import { cookieOptions } from "../config/cookie.config.js";
import User from "../models/user.model.js";

export const generateTokensAndSetCookies = async (user, res) => {
  // Generate Tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save Refresh Token
  user.refreshToken = refreshToken;

  // Don't trigger password validation again
  await user.save({ validateBeforeSave: false });

  // Set Cookies
  res.cookie("accessToken", accessToken, cookieOptions.accessToken);

  res.cookie("refreshToken", refreshToken, cookieOptions.refreshToken);

  return {
    accessToken,
    refreshToken,
  };
};

// https://chatgpt.com/share/6aad7197-df74-83ee-a6a7-53f7295e1afd
export const sanitizeUser = (user) => {
  return {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
