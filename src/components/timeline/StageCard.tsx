// // src/components/timeline/StageCard.tsx
// import { useState } from "react";
// import StageHeader from "./StageHeader";
// import StageDetails from "./StageDetails";

// const StageCard = ({ stage, student }: any) => {
//   const [open, setOpen] = useState(false);

//   const isActive = student.currentStage === stage.stage;
//   const isCompleted = student.stageSequence > stage.sequence;

//   return (
//     <div className="relative pl-8">
//       {/* vertical line */}
//       <div className="absolute left-1 top-0 bottom-0 w-1 bg-gray-200" />

//       <StageHeader
//         stage={stage}
//         isActive={isActive}
//         isCompleted={isCompleted}
//         open={open}
//         onToggle={() => setOpen(!open)}
//       />

//       {open && (
//         <StageDetails stage={stage} student={student} />
//       )}
//     </div>
//   );
// };

// export default StageCard;
// src/components/timeline/StageCard.tsx
import { useState } from "react";
import StageHeader from "./StageHeader";
import StageDetails from "./StageDetails";

const StageCard = ({ stage, student }: any) => {
  const [open, setOpen] = useState(false);

  // ✅ USE STATUS COMING FROM TIMELINE
  const isActive = stage.status === "active";
  const isCompleted = stage.status === "completed";

  return (
    <div className="relative pl-8">
      {/* vertical line */}
      <div className="absolute left-1 top-0 bottom-0 w-1 bg-gray-200" />

      <StageHeader
        stage={stage}
        isActive={isActive}
        isCompleted={isCompleted}
        open={open}
        onToggle={() => setOpen(!open)}
      />

      {open && <StageDetails stage={stage} student={student} />}
    </div>
  );
};

export default StageCard;
