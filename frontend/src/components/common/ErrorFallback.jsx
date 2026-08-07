function ErrorFallback({
    error,
    resetErrorBoundary,
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <h1 className="text-5xl font-bold text-red-500">
                Oops!
            </h1>

            <p className="mt-4 text-lg">
                Something unexpected happened.
            </p>

            {error && (
                <pre className="mt-6 max-w-xl overflow-auto rounded bg-gray-100 p-4 text-left text-sm">
                    {error.message}
                </pre>
            )}

            <button
                onClick={resetErrorBoundary}
                className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white"
            >
                Try Again
            </button>
        </div>
    );
}

export default ErrorFallback;