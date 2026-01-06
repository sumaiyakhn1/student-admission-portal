// src/components/timeline/SubmittedFields.tsx
const SubmittedFields = ({ student }: any) => {
    const fields = [
      ["Student Name", student.name],
      ["Father Name", student.fatherName],
      ["Email", student.email],
      ["Phone", student.phone],
      ["Gender", student.gender],
      ["DOB", student.dob],
      ["City", student.city],
      ["State", student.state],
    ];
  
    return (
      <div className="grid grid-cols-2 gap-4 text-sm">
        {fields.map(([label, value]) => (
          <div key={label}>
            <p className="text-gray-500">{label}</p>
            <p className="font-medium">{value || "—"}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default SubmittedFields;
  