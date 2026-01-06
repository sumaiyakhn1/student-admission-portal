import { useNavigate, useLocation } from "react-router-dom";
import { FileText, CreditCard, HelpCircle, User } from "lucide-react";

const FooterTabs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around px-2 sm:px-4 md:px-6 py-2 z-50">

      {/* Application */}
      <button
        onClick={() => navigate("/application")}
        className={`flex flex-col items-center text-[10px] sm:text-xs gap-0.5 sm:gap-1 ${pathname === "/application" ? "text-orange-600 font-bold" : "text-gray-500"}`}
      >
        <FileText className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
        <span className="hidden sm:inline">Application</span>
        <span className="sm:hidden">App</span>
      </button>

      {/* Payments */}
      <button
        onClick={() => navigate("/payments")}
        className={`flex flex-col items-center text-[10px] sm:text-xs gap-0.5 sm:gap-1 ${pathname === "/payments" ? "text-orange-600 font-bold" : "text-gray-500"}`}
      >
        <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
        Payments
      </button>

      {/* Queries */}
      {/* <button
        onClick={() => navigate("/queries")}
        className={`flex flex-col items-center text-[10px] sm:text-xs gap-0.5 sm:gap-1 ${pathname === "/queries" ? "text-orange-600 font-bold" : "text-gray-500"}`}
      >
        <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
        Queries
      </button> */}

      {/* Profile */}
      <button
        onClick={() => navigate("/profile")}
        className={`flex flex-col items-center text-[10px] sm:text-xs gap-0.5 sm:gap-1 ${pathname === "/profile" ? "text-orange-600 font-bold" : "text-gray-500"}`}
      >
        <User className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
        Profile
      </button>

    </div>
  );
};

export default FooterTabs;
