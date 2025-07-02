// src/components/Layout.jsx
import { Outlet, useLocation, Link } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  // Hide navbar only on the homepage
  const hideNavbar = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conditionally render Navbar */}
      {!hideNavbar && (
        <nav className="bg-orange-500 text-white p-4 shadow">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              YatraVerse
            </Link>
            <div className="space-x-4">
              <Link to="/virtual-pilgrimage" className="hover:underline">Virtual Yatra</Link>
              <Link to="/smart-assistant" className="hover:underline">Assistant</Link>
              <Link to="/ar-quest" className="hover:underline">AR Quest</Link>
              <Link to="/eco-tracker" className="hover:underline">Eco Tracker</Link>
              <Link to="/spiritual-dashboard" className="hover:underline">Spiritual Health</Link>
            </div>
          </div>
        </nav>
      )}

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4 bg-yellow-50">
        © {new Date().getFullYear()} YatraVerse. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
