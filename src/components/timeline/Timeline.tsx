// src/components/timeline/Timeline.tsx
import StageCard from "./StageCard";

interface Props {
  stages: any[];
  student: any;
}

const Timeline = ({ stages, student }: Props) => {
  // 1️⃣ Sort stages by sequence
  const orderedStages = [...stages].sort(
    (a, b) => a.sequence - b.sequence
  );

  // 2️⃣ Find current stage sequence using student.currentStage
  const currentStageName = student?.currentStage;

  const currentStageObj = orderedStages.find(
    (s) => s.stage === currentStageName
  );

  const currentSequence = currentStageObj?.sequence ?? 0;

  // 3️⃣ Assign status based on sequence
  const enrichedStages = orderedStages.map((stage) => {
    let status: "completed" | "active" | "pending" = "pending";

    if (stage.sequence < currentSequence) {
      status = "completed";
    } else if (stage.sequence === currentSequence) {
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
