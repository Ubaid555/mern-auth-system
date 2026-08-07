import { useNavigate } from "react-router-dom";

import Button from "../common/Button";

import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/routes";

import { notify } from "../../utils/toast";

function UserMenu() {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();

            notify.success("Logged out successfully");

            navigate(ROUTES.LOGIN);
        } catch (error) {
            notify.error(error.message);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
                {user?.name}
            </span>

            <Button
                variant="danger"
                className="w-auto px-4 py-2"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    );
}

export default UserMenu;