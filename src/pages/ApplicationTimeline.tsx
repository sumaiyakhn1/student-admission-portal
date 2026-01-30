import { useEffect, useState } from "react";
import Header from "../components/Header";
import Timeline from "../components/timeline/Timeline";
import { getStudentById } from "../services/studentService";
import { getAdmissionStages } from "../services/stageService";
import { saveAdmissionApplication } from "../services/admissionService";
import FooterTabs from "../components/FooterTabs";

const ApplicationTimeline = () => {
  const [student, setStudent] = useState<any>(null);
  const [stages, setStages] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [studentRes, stageRes] = await Promise.all([
        getStudentById(),
        getAdmissionStages(),
      ]);

      setStudent(studentRes.data);
      setStages(stageRes.data);
    };

    load();
  }, []);

  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        ...student,
        ...formData,
      };

      await saveAdmissionApplication(payload);

      setStudent(payload); // reflect saved data
      setFormData({});
      alert("Saved successfully");
    } catch (e) {
      console.error(e);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!student) return <div className="p-6">Loading…</div>;

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-24">
      <Header studentName={student.name} />

      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">
          Application Timeline
        </h1>

        <Timeline
          stages={stages}
          student={student}
          formData={formData}
          onChange={handleFieldChange}
          onSave={handleSave}
          saving={saving}
        />
      </div>

      <FooterTabs />
    </div>
  );
};

export default ApplicationTimeline;
