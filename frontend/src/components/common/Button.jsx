function Button({
    children,
    type = "button",
    variant = "primary",
    loading = false,
    disabled = false,
    className = "",
    ...props
}) {
    const variants = {
        primary:
            "bg-blue-600 hover:bg-blue-700 text-white",

        secondary:
            "bg-gray-200 hover:bg-gray-300 text-gray-800",

        danger:
            "bg-red-600 hover:bg-red-700 text-white",
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`
        w-full
        rounded-lg
        px-4
        py-2.5
        font-medium
        transition
        duration-200
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${variants[variant]}
        ${className}
      `}
            {...props}
        >
            {loading ? "Please wait..." : children}
        </button>
    );
}

export default Button;