import { useState } from "react";

export function useForm(initialValues, validate, onSubmit) {
    const [values, setValues] = useState(initialValues);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate(values);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);

            await onSubmit(values);

            resetForm();
        } finally {
            setLoading(false);
        }
    };

    return {
        values,
        errors,
        loading,

        setErrors,

        handleChange,
        handleSubmit,
        resetForm,
    };
}