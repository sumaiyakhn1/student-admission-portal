import { useState } from "react";
import StageHeader from "./StageHeader";
import StageDetails from "./StageDetails";

const StageCard = ({
  stage,
  student,
  formData,
  onChange,
  onSave,
  saving,
}: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative pl-8">
      <div className="absolute left-1 top-0 bottom-0 w-1 bg-gray-200" />

      <StageHeader
        stage={stage}
        isActive={stage.status === "active"}
        isCompleted={stage.status === "completed"}
        open={open}
        onToggle={() => setOpen(!open)}
      />

      {open && (
        <StageDetails
          stage={stage}
          student={student}
          formData={formData}
          onChange={onChange}
          onSave={onSave}
          saving={saving}
        />
      )}
    </div>
  );
};

export default StageCard;
