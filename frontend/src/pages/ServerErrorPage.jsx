import { Link } from "react-router-dom";

import { ROUTES } from "../constants/routes";

function ServerErrorPage() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
            <h1 className="text-7xl font-bold text-orange-500">
                500
            </h1>

            <h2 className="mt-4 text-3xl font-semibold">
                Server Error
            </h2>

            <p className="mt-2 text-gray-500">
                Something went wrong on our side.
            </p>

            <Link
                to={ROUTES.HOME}
                className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
                Return Home
            </Link>
        </div>
    );
}

export default ServerErrorPage;