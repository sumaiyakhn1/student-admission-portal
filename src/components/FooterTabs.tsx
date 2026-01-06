import { useNavigate, useLocation } from "react-router-dom";
import { FileText, CreditCard, HelpCircle, User } from "lucide-react";

const FooterTabs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around px-6 py-2 z-50">

      {/* Application */}
      <button
        onClick={() => navigate("/application")}
        className={`flex flex-col items-center text-xs ${pathname === "/application" ? "text-orange-600 font-bold" : "text-gray-500"}`}
      >
        <FileText className="text-xl" strokeWidth={2} />
        Application
      </button>

      {/* Payments */}
      <button
        onClick={() => navigate("/payments")}
        className={`flex flex-col items-center text-xs ${pathname === "/payments" ? "text-orange-600 font-bold" : "text-gray-500"}`}
      >
        <CreditCard className="text-xl" strokeWidth={2} />
        Payments
      </button>

      {/* Queries */}
      {/* <button
        onClick={() => navigate("/queries")}
        className={`flex flex-col items-center text-xs ${pathname === "/queries" ? "text-orange-600 font-bold" : "text-gray-500"}`}
      >
        <HelpCircle className="text-xl" strokeWidth={2} />
        Queries
      </button> */}

      {/* Profile */}
      <button
        onClick={() => navigate("/profile")}
        className={`flex flex-col items-center text-xs ${pathname === "/profile" ? "text-orange-600 font-bold" : "text-gray-500"}`}
      >
        <User className="text-xl" strokeWidth={2} />
        Profile
      </button>

    </div>
  );
};

export default FooterTabs;
