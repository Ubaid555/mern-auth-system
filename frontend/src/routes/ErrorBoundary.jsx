import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "../components/common/ErrorFallback";

function AppErrorBoundary({ children }) {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                window.location.reload();
            }}
        >
            {children}
        </ErrorBoundary>
    );
}

export default AppErrorBoundary;