import { Link } from "react-router-dom";

import { ROUTES } from "../constants/routes";

function UnauthorizedPage() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
            <h1 className="text-7xl font-bold text-red-500">
                403
            </h1>

            <h2 className="mt-4 text-3xl font-semibold">
                Access Denied
            </h2>

            <p className="mt-2 text-gray-500">
                You don't have permission to view this page.
            </p>

            <Link
                to={ROUTES.HOME}
                className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
                Back Home
            </Link>
        </div>
    );
}

export default UnauthorizedPage;