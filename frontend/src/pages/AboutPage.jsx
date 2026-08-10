import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ROUTES } from "../constants/routes";

// 1. A mini-component that DOES use Context
function DynamicCallToAction() {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (isAuthenticated) {
    return (
      <div className="p-4 bg-green-100 rounded-lg">
        <p className="text-green-800 font-medium">Welcome back, {user?.name}! Head to your dashboard.</p>
        <Link to={ROUTES.HOME} className="mt-2 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <p className="text-blue-800 font-medium">Ready to get started?</p>
      <Link to={ROUTES.LOGIN} className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Sign in to your account
      </Link>
    </div>
  );
}

// 2. The Main Page that DOES NOT use Context
const AboutPage = () => {
  // Notice: We are not calling useContext() here at all!
  // This page is completely "dumb" to the authentication state.

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">About Our MERN App</h1>

      <p className="text-lg text-gray-700 mb-6">
        This is a public page. Anyone can see this text, whether they are logged in or logged out.
        Because this specific component (AboutPage) never imports or calls `useContext`, it is
        completely detached from the auth flow. It does not re-render when the user logs in or out!
      </p>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
        <h2 className="text-2xl font-semibold mb-4">How it works under the hood</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>The <code>{"<AuthProvider />"}</code> is still sitting at the very top of our app in `main.jsx`.</li>
          <li>It is currently broadcasting the auth state over the app like a radio station.</li>
          <li>This `AboutPage` component simply chooses not to turn on its radio.</li>
        </ul>
      </div>

      {/* Here we drop in our smaller component that DOES turn on the radio */}
      <h3 className="text-xl font-semibold mb-3">Dynamic Component Example Below:</h3>
      <DynamicCallToAction />

    </div>
  );
};

export default AboutPage;
