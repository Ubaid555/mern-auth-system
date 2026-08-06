import TextInput from "./TextInput";

function FormField({
    label,
    error,
    required = false,
    ...inputProps
}) {
    return (
        <div className="space-y-2">
            <label
                htmlFor={inputProps.id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}

                {required && (
                    <span className="ml-1 text-red-500">*</span>
                )}
            </label>

            <TextInput {...inputProps} />

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

export default FormField;