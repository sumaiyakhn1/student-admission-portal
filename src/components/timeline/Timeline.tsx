// src/components/timeline/Timeline.tsx
import StageCard from "./StageCard";

interface Props {
  stages: any[];
  student: any;
}

const Timeline = ({ stages, student }: Props) => {
  // 1️⃣ Sort ALL stages by sequence
  const orderedStages = [...stages].sort(
    (a, b) => a.sequence - b.sequence
  );

  // 🔴 HARD-CODED completed stages (temporary)
  const FORCE_COMPLETED = ["Enquiry", "Data Requested"];

  // 2️⃣ Resolve current stage
  const currentStageName = student?.currentStage;

  // 3️⃣ Assign status
  const enrichedStages = orderedStages.map((stage) => {
    let status: "completed" | "active" | "pending" = "pending"; // ✅ FIX

    // ✅ Force completed
    if (FORCE_COMPLETED.includes(stage.stage)) {
      status = "completed";
    }
    // 🟡 Active stage
    else if (stage.stage === currentStageName) {
      status = "active";
    }

    return {
      ...stage,
      status,
    };
  });

  return (
    <div className="space-y-6">
      {enrichedStages.map((stage) => (
        <StageCard
          key={stage._id}
          stage={stage}
          student={student}
        />
      ))}
    </div>
  );
};

export default Timeline;
