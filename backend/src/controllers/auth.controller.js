import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  generateTokensAndSetCookies,
  sanitizeUser,
} from "../helpers/auth.helper.js";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../config/cookie.config.js";

export const registerUser = asyncHandler(async (req, res) => {
  // Extract data from request body
  const fullName = (req.body.fullName || req.body.name || "").trim();
  const email = (req.body.email || "").trim();
  const password = req.body.password || "";

  // Validate required fields
  if (!fullName || !email || !password) {
    throw new ApiError(400, "All fields are required.");
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    throw new ApiError(409, "Email is already registered.");
  }

  // Create new user
  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    password,
  });

  // Generate tokens & set cookies
  await generateTokensAndSetCookies(user, res);

  // Send success response
  return res
    .status(201)
    .json(
      new ApiResponse(201, sanitizeUser(user), "User registered successfully."),
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  // Extract request body
  const { email, password } = req.body;

  // Validate input
  if (
    [email, password].some(
      (field) => typeof field !== "string" || field.trim() === "",
    )
  ) {
    throw new ApiError(400, "Email and password are required.");
  }

  // Find user and include hidden fields
  const user = await User.findOne({
    email: email.toLowerCase(),
  }).select("+password +refreshToken");

  // User not found
  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  // Verify password
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password.");
  }

  // Generate new access & refresh tokens
  await generateTokensAndSetCookies(user, res);

  // Send response
  return res
    .status(200)
    .json(new ApiResponse(200, sanitizeUser(user), "Login successful."));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        sanitizeUser(req.user),
        "Current User Fetched Successfully",
      ),
    );
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh Token is missing");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh Token");
  }

  const user = await User.findById(decodedToken.userId).select("+refreshToken");

  if (!user) {
    throw new ApiError(401, "User no longer exists.");
  }

  if (user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "Refresh token has been reused or is invalid.");
  }

  await generateTokensAndSetCookies(user, res);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Access Token refreshed successfully."));
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: {
      refreshToken: 1,
    },
  });

  res.clearCookie("accessToken", cookieOptions.accessToken);
  res.clearCookie("refreshToken", cookieOptions.refreshToken);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Logged out successfully."));
});
