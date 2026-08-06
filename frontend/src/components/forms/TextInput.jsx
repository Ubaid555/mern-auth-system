import { forwardRef } from "react";

const TextInput = forwardRef(
    (
        {
            type = "text",
            placeholder = "",
            value,
            onChange,
            name,
            id,
            autoComplete,
            disabled = false,
            className = "",
            ...props
        },
        ref
    ) => {
        return (
            <input
                ref={ref}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                disabled={disabled}
                className={`
          w-full
          rounded-lg
          border
          border-gray-300
          px-4
          py-2.5
          outline-none
          transition
          duration-200
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          disabled:bg-gray-100
          ${className}
        `}
                {...props}
            />
        );
    }
);

TextInput.displayName = "TextInput";

export default TextInput;