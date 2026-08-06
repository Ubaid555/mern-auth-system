import { Link, useNavigate } from "react-router-dom";

import AuthCard from "../components/forms/AuthCard";
import FormField from "../components/forms/FormField";
import Button from "../components/common/Button";

import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

import { validateRegister } from "../validators/auth.validator";

import { ROUTES } from "../constants/routes";
import { notify } from "../utils/toast";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const {
    values,
    errors,
    loading,
    setErrors,
    handleChange,
    handleSubmit,
  } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validateRegister,

    async (values) => {
      try {
        await register({
          fullName: values.name,
          email: values.email,
          password: values.password,
        });

        notify.success("Registration successful");
        navigate(ROUTES.HOME);
      } catch (error) {
        notify.error(error.message || "Registration failed");
        setErrors({
          email: error.message,
        });
      }
    }
  );

  return (
    <AuthCard
      title="Create Account"
      subtitle="Register to continue"
      footer={
        <>
          Already have an account?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {errors.general && (
          <p className="text-center text-red-500">
            {errors.general}
          </p>
        )}

        <FormField
          id="name"
          name="name"
          label="Name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <FormField
          id="email"
          name="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <FormField
          id="password"
          name="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <FormField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        <Button
          type="submit"
          loading={loading}
        >
          Register
        </Button>
      </form>
    </AuthCard>
  );
}

export default Register;