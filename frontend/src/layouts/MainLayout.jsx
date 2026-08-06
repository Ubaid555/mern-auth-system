import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
