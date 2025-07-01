// src/pages/NotFound.jsx

import { Link } from "react-router-dom";
import { Button } from "@/components/button";
import { Ghost } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 text-center px-4">
      <Ghost className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-gray-700 text-lg mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 px-6 py-3">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
