export class ApiError extends Error {
  constructor(error) {
    super(
      error?.response?.data?.message ||
        error?.message ||
        "Something went wrong.",
    );

    this.name = "ApiError";

    this.status = error?.response?.status || 500;

    this.data = error?.response?.data || null;
  }
}
