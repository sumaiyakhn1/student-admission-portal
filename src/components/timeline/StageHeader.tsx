// src/components/timeline/StageHeader.tsx
import { ChevronDown, ChevronUp } from "lucide-react";

const StageHeader = ({ stage, isActive, isCompleted, open, onToggle }: any) => {
  const status = isActive
    ? "ACTIVE"
    : isCompleted
    ? "COMPLETED"
    : "PENDING";

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 bg-white rounded-xl p-3 sm:p-4 shadow mb-2">
      <div className="flex-1 min-w-0">
        <h3
          className={`text-sm sm:text-base font-semibold break-words ${
            isActive ? "text-green-600" : "text-gray-800"
          }`}
        >
          {stage.stage}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500">{status}</p>
      </div>

      <button
        onClick={onToggle}
        className="text-orange-600 flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap"
      >
        <span className="hidden sm:inline">{open ? "Hide Details" : "View Details"}</span>
        <span className="sm:hidden">{open ? "Hide" : "View"}</span>
        {open ? <ChevronUp size={14} className="sm:w-4 sm:h-4" /> : <ChevronDown size={14} className="sm:w-4 sm:h-4" />}
      </button>
    </div>
  );
};

export default StageHeader;
