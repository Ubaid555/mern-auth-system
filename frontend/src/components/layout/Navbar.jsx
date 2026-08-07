import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import UserMenu from "./UserMenu";

function Navbar() {
    return (
        <header className="bg-white shadow">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link
                    to={ROUTES.HOME}
                    className="text-2xl font-bold text-blue-600"
                >
                    MERN Auth
                </Link>

                <nav className="flex items-center gap-6">
                    <Link
                        to={ROUTES.HOME}
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Home
                    </Link>

                    <Link
                        to={ROUTES.PROFILE}
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Profile
                    </Link>

                    <UserMenu />
                </nav>
            </div>
        </header>
    );
}

export default Navbar;