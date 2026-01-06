import { useEffect, useState } from "react";
import Header from "../components/Header";
import Timeline from "../components/timeline/Timeline";
import { getStudentById } from "../services/studentService";
import { getAdmissionStages } from "../services/stageService";
import FooterTabs from "../components/FooterTabs";

const ApplicationTimeline = () => {
  const [student, setStudent] = useState<any>(null);
  const [stages, setStages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [studentRes, stageRes] = await Promise.all([
          getStudentById(),
          getAdmissionStages(),
        ]);

        setStudent(studentRes.data || null);
        setStages(stageRes.data || []);
      } catch (e) {
        console.error("Timeline load error", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading timeline…</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Header studentName={student?.name} />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Application Timeline</h1>

        {/* 🔥 LOGIC MOVED TO Timeline */}
        <Timeline stages={stages} student={student} />
      </div>

      <FooterTabs />
    </div>
  );
};

export default ApplicationTimeline;
