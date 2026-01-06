import { useEffect, useState } from "react";
import { getStudentById } from "../services/studentService";
import Header from "../components/Header";
import ApplicationCard from "../components/ApplicationCard";
import FooterTabs from "../components/FooterTabs";

const Dashboard = () => {
  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentById();
  
        console.log("✅ FULL API RESPONSE:", res);
        console.log("✅ RESPONSE.DATA:", res. data);
        console.log("✅ STUDENT KEYS:", Object.keys(res.data || {}));
  
        setStudentData(res.data);
      } catch (error) {
        console.error("❌ Student API failed:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      <Header studentName={studentData?.name || "Student"} />

      <div className="p-6">
        {studentData && (
          <ApplicationCard
            student={studentData}
            onView={() =>
              window.location.href = "/application/timeline"
            }
          />
        )}
      </div>
      <FooterTabs />
    </div>
  );
};

export default Dashboard;
