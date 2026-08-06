import { Link, useNavigate } from "react-router-dom";

import AuthCard from "../components/forms/AuthCard";
import FormField from "../components/forms/FormField";
import Button from "../components/common/Button";

import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";

import { validateLogin } from "../validators/auth.validator";

import { ROUTES } from "../constants/routes";

import { notify } from "../utils/toast";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    values,
    errors,
    loading,
    setErrors,
    handleChange,
    handleSubmit,
  } = useForm(
    {
      email: "",
      password: "",
    },

    validateLogin,

    async (values) => {
      try {
        await login(values);

        notify.success("Welcome back!");

        navigate(ROUTES.HOME);
      } catch (error) {
        setErrors({
          general: error.message,
        });

        notify.error(error.message);
      }
    }
  );

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to your account"
      footer={
        <>
          Don't have an account?{" "}
          <Link
            to={ROUTES.REGISTER}
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {errors.general && (
          <p className="rounded-md bg-red-100 p-3 text-sm text-red-700">
            {errors.general}
          </p>
        )}

        <FormField
          id="email"
          name="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
          autoComplete="email"
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
          autoComplete="current-password"
        />

        <Button
          type="submit"
          loading={loading}
        >
          Login
        </Button>
      </form>
    </AuthCard>
  );
}

export default Login;