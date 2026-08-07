export class ApiError extends Error {
  constructor(error) {
    super();

    const response = error?.response;

    this.status = response?.status ?? 500;

    this.success = false;

    this.message =
      response?.data?.message ||
      error?.message ||
      "Something went wrong";

    this.errors = response?.data?.errors ?? [];

    this.data = response?.data ?? null;

    this.name = "ApiError";
  }

  static from(error) {
    return new ApiError(error);
  }
}