// src/components/timeline/StageHeader.tsx
import { ChevronDown, ChevronUp } from "lucide-react";

const StageHeader = ({ stage, isActive, isCompleted, open, onToggle }: any) => {
  const status = isActive
    ? "ACTIVE"
    : isCompleted
    ? "COMPLETED"
    : "PENDING";

  return (
    <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow mb-2">
      <div>
        <h3
          className={`font-semibold ${
            isActive ? "text-green-600" : "text-gray-800"
          }`}
        >
          {stage.stage}
        </h3>
        <p className="text-sm text-gray-500">{status}</p>
      </div>

      <button
        onClick={onToggle}
        className="text-orange-600 flex items-center gap-1"
      >
        {open ? "Hide Details" : "View Details"}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
    </div>
  );
};

export default StageHeader;
