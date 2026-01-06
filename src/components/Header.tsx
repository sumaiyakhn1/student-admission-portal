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
    <header className="bg-white border-b shadow-sm px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between sticky top-0 z-50">
      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <img src="/logo.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded flex-shrink-0" />
        <h1 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">
          <span className="hidden sm:inline">Student Admission Portal</span>
          <span className="sm:hidden">Admission Portal</span>
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        {studentName && (
          <span className="text-gray-700 font-medium hidden md:block text-sm">
            {studentName}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-red-200"
        >
          <LogOut size={14} className="sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
