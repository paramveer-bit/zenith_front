export type AppError = {
    code: string; // A unique error code
    message: string; // A human-readable error message
    details?: string; // Optional additional details about the error
    timestamp?: Date; // Optional timestamp of when the error occurred
};