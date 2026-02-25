import { useCallback, useEffect, useState } from "react";
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

  const loadData = async () => {
    const [studentRes, stageRes] = await Promise.all([
      getStudentById(),
      getAdmissionStages(),
    ]);
    setStudent(studentRes.data);
    setStages(stageRes.data);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStudentRefresh = useCallback(() => {
    // Re-fetch student after a successful payment to update PaymentSummary
    getStudentById().then((res) => setStudent(res.data)).catch(console.error);
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
      const payload = { ...student, ...formData };
      await saveAdmissionApplication(payload);
      setStudent(payload);
      setFormData({});
      alert("Saved successfully");
    } catch (e) {
      console.error(e);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!student)
    return (
      <div className="min-h-screen bg-gray-100 pb-24">
        <Header />
        <div className="flex justify-center items-center h-[60vh]"><div className="loader" /></div>
        <FooterTabs />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <Header studentName={student.name} />

      <div className="page-enter max-w-5xl mx-auto p-4 sm:p-6">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
          Application Timeline
        </h1>

        <Timeline
          stages={stages}
          student={student}
          formData={formData}
          onChange={handleFieldChange}
          onSave={handleSave}
          saving={saving}
          onStudentRefresh={handleStudentRefresh}
        />
      </div>

      <FooterTabs />
    </div>
  );
};

export default ApplicationTimeline;
