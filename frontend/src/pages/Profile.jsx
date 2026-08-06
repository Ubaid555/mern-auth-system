import { useAuth } from "../hooks/useAuth";

const Profile = () => {

  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto mt-10 rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-3xl font-bold">
        Profile
      </h1>

      <p>
        <strong>Name:</strong> {user?.fullName}
      </p>

      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      <p>
        <strong>Role:</strong> {user?.role}
      </p>

    </div>
  );
};

export default Profile;
