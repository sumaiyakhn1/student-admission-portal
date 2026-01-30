import StageCard from "./StageCard";

interface Props {
  stages: any[];
  student: any;
  formData: any;
  onChange: (key: string, value: any) => void;
  onSave: () => void;
  saving?: boolean; // ✅ optional
}

const Timeline = ({
  stages,
  student,
  formData,
  onChange,
  onSave,
  saving,
}: Props) => {
  const orderedStages = [...stages].sort(
    (a, b) => a.sequence - b.sequence
  );

  const currentStageObj = orderedStages.find(
    (s) => s.stage === student.currentStage
  );

  const currentSeq = currentStageObj?.sequence ?? 0;

  const enrichedStages = orderedStages.map((stage) => {
    let status: "completed" | "active" | "pending" = "pending";

    if (stage.sequence < currentSeq) status = "completed";
    else if (stage.sequence === currentSeq) status = "active";

    return { ...stage, status };
  });

  return (
    <div className="space-y-6">
      {enrichedStages.map((stage) => (
        <StageCard
          key={stage._id}
          stage={stage}
          student={student}
          formData={formData}
          onChange={onChange}
          onSave={onSave}
          saving={saving}
        />
      ))}
    </div>
  );
};

export default Timeline;
