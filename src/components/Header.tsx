import React from "react";
import { LogOut } from "lucide-react";

interface HeaderProps {
  studentName?: string;
}

const Header: React.FC<HeaderProps> = ({ studentName }) => {
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.replace("/login");
  };

  return (
    <header className="bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded" />
        <h1 className="text-lg font-bold text-gray-800">
          Student Admission Portal
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {studentName && (
          <span className="text-gray-700 font-medium hidden sm:block">
            {studentName}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-200"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
