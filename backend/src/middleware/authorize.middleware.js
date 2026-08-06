import ApiError from "../utils/ApiError.js";


export const authorize = (...roles) => {
  return (req, res, next) => {
    // User is already attached by protect middleware
    if (!req.user) {
      return next(new ApiError(401, "Unauthorized request."));
    }

    // Check role
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(403, "You do not have permission to perform this action."),
      );
    }

    next();
  };
};
