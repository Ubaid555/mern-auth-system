import { ApiError } from "./apiError";

export function handleApiError(error) {
    const apiError = ApiError.from(error);

    if (apiError.status >= 500) {
        console.error(apiError);
    }

    return apiError;
}