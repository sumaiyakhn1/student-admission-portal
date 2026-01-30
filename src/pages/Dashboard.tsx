import { useEffect, useState } from "react";
import { listAdmissionStudents } from "../services/admissionListService";
import Header from "../components/Header";
import ApplicationCard from "../components/ApplicationCard";
import FooterTabs from "../components/FooterTabs";

const Dashboard = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await listAdmissionStudents();

        console.log("✅ FULL LIST API RESPONSE:", res);
        console.log("✅ RESPONSE.DATA:", res.data);

        const list = res.data?.data || [];
        setStudents(list);
      } catch (err: any) {
        console.error("❌ Admission list API failed:", err);
        setError(
          err?.response?.data?.message ||
            "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewApplication = (student: any) => {
    // Store selected admission _id for downstream pages
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedStudentId", student._id);
    }
    window.location.href = "/application/timeline";
  };

  const firstName = students[0]?.name || "Student";

  if (loading) {
    return (
      <div className="bg-[#FFF8F0] min-h-screen pb-20 sm:pb-24">
        <Header studentName={firstName} />
        <div className="flex justify-center items-center h-[60vh] text-gray-500">
          Loading applications...
        </div>
        <FooterTabs />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#FFF8F0] min-h-screen pb-20 sm:pb-24">
        <Header studentName={firstName} />
        <div className="flex justify-center items-center h-[60vh] text-red-500 px-4 text-center">
          {error}
        </div>
        <FooterTabs />
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8F0] min-h-screen pb-20 sm:pb-24">
      <Header studentName={firstName} />

      <div className="p-3 sm:p-4 md:p-6 space-y-4">
        {students.map((student) => (
          <ApplicationCard
            key={student._id}
            student={student}
            onView={() => handleViewApplication(student)}
          />
        ))}
      </div>
      <FooterTabs />
    </div>
  );
};

export default Dashboard;
