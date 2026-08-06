import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

function AuthCard({
    title,
    subtitle,
    children,
    footer,
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">{title}</h1>

                    {subtitle && (
                        <p className="mt-2 text-gray-500">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="space-y-5">
                    {children}
                </div>

                {footer && (
                    <div className="mt-6 text-center">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthCard;