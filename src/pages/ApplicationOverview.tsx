import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { getStudentById } from "../services/studentService";
import { getAdmissionStages } from "../services/stageService";

const ApplicationOverview = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState<any>(null);
  const [stages, setStages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const studentRes = await getStudentById();
        const stageRes = await getAdmissionStages();

        setStudent(studentRes.data);
        setStages(stageRes.data || []);
      } catch (e) {
        console.error("Failed to load application overview", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading application overview…
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500">
        Unable to load application
      </div>
    );
  }

  const activeStage = stages.find(
    (s) => s.stage === student.currentStage
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">

      {/* 🔝 TOP BAR */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Application Overview
        </h1>

        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2
            text-sm font-semibold
            text-red-600 hover:text-red-700
            px-4 py-2 rounded-xl
            border border-red-200 hover:border-red-300
            bg-white
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* APPLICATION CARD */}
      <div className="bg-white rounded-3xl shadow-lg p-6 space-y-5">

        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Application ID</p>
            <p className="text-xl font-bold tracking-wide">
              {student.applicationNumber}
            </p>
          </div>

          <span className="px-4 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
            Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-3 text-gray-700 text-sm">
          <Info label="Course" value={student.course} />
          <Info label="Stream" value={student.stream} />
          <Info label="Batch" value={student.batch} />
          <Info label="Session" value={student.session} />
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-1">Current Stage</p>
          <p className="text-lg font-semibold text-gray-800">
            {activeStage?.stage || student.currentStage || "—"}
          </p>
        </div>

        <button
          onClick={() => navigate("/application/timeline")}
          className="
            w-full py-3
            bg-blue-600 hover:bg-blue-700
            text-white text-lg font-semibold
            rounded-2xl transition
          "
        >
          View Application →
        </button>
      </div>
    </div>
  );
};

export default ApplicationOverview;

/* -------- Helper -------- */
const Info = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value || "—"}</span>
  </div>
);
