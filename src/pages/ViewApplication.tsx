import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentById } from "../services/studentService";
import {
  ArrowLeft, User2, GraduationCap, FileText, Wallet2, Clock, CheckCircle
} from "lucide-react";

const ViewApplication = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    getStudentById()
      .then((res) => setStudent(res.data))
      .catch((err) => console.log("❌ ERROR:", err));
  }, []);

  if (!student)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FFF8F0] text-gray-700 text-lg">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mr-3"></div>
        Loading application details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFEBD4] pb-20 sm:pb-32">

      {/* 🔙 Header */}
      <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 shadow-lg bg-white sticky top-0 z-50 border-b">
        <button onClick={() => navigate(-1)} className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200">
          <ArrowLeft size={20} className="sm:w-[22px] sm:h-[22px]" />
        </button>
        <h1 className="text-lg sm:text-xl font-semibold tracking-wide">View Application</h1>
      </div>

      {/* MAIN CONTENT */}
      <div className="p-3 sm:p-4 md:p-5 space-y-4 sm:space-y-6 md:space-y-8">

        {/* PROFILE HEADER */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 border">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">{student.name}</h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 break-words">{student.phone}</p>
            <p className="text-gray-600 text-xs sm:text-sm break-words">{student.email}</p>
          </div>
          <div className="bg-orange-500 text-white font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-md text-xs sm:text-sm whitespace-nowrap">
            {student.currentStage}
          </div>
        </div>

        {/* 📌 PERSONAL DETAILS */}
        <Section icon={<User2 className="text-orange-500" />} title="Personal Information">
          <Field label="Full Name" value={student.name} />
          <Field label="Father's Name" value={student.fatherName} />
          <Field label="Mother's Name" value={student.motherName} />
          <Field label="Gender" value={student.gender} />
          <Field label="DOB" value={new Date(student.dob).toLocaleDateString()} />
          <Field label="Phone" value={student.phone} />
          <Field label="Email" value={student.email} />
          <Field label="City" value={student.city} />
          <Field label="State" value={student.state} />
          <Field label="Pin Code" value={student.pinCode} />
          <Field label="Nationality" value={student.nationality} />
          <Field label="Religion" value={student.religion || "—"} />
        </Section>

        {/* 🎓 ACADEMIC */}
        <Section icon={<GraduationCap className="text-orange-500" />} title="Academic Details">
          <Field label="Course" value={student.course} />
          <Field label="Stream" value={student.stream} />
          <Field label="Batch" value={student.batch} />
          <Field label="Session" value={student.session} />
          <Field label="Source ID" value={student.sourceId} />
          <Field label="Status" value={student.status ? "Active" : "Inactive"} />
        </Section>

        {/* 📚 EDUCATION HISTORY */}
        <Section icon={<FileText className="text-orange-500" />} title="Educational Records">
          <SubTitle>10th Qualification</SubTitle>
          <Field label="Board" value={student.educationDetails1University} />
          <Field label="Passing Year" value={student.educationDetails1PassingYear} />
          <Field label="Percentage" value={student.educationDetails1Percentage} />

          <SubTitle>12th Qualification</SubTitle>
          <Field label="Board" value={student.educationDetails2University} />
          <Field label="Passing Year" value={student.educationDetails2PassingYear} />
          <Field label="Percentage" value={student.educationDetails2Percentage} />

          {student.educationDetails3Class && (
            <>
              <SubTitle>Diploma / Graduation</SubTitle>
              <Field label="Qualification" value={student.educationDetails3Class} />
              <Field label="University" value={student.educationDetails3University} />
              <Field label="Percentage" value={student.educationDetails3Percentage} />
            </>
          )}
        </Section>

        {/* APPLICATION */}
        <Section icon={<CheckCircle className="text-orange-500" />} title="Application Details">
          <Field label="Application No." value={student.applicationNumber} />
          <Field label="Created On" value={new Date(student.createdAt).toLocaleString()} />
          <Field label="Last Updated" value={new Date(student.updatedAt).toLocaleString()} />

          <button
            className="mt-3 sm:mt-4 bg-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow hover:bg-orange-600 text-sm sm:text-base w-full sm:w-auto"
            onClick={() => navigate("/payments")}
          >
            View Payments →
          </button>
        </Section>

        {/* TIMELINE */}
        <Section icon={<Clock className="text-orange-500" />} title="Application Timeline">
          {student.timeline?.length ? (
            <div className="w-full col-span-2 space-y-4 sm:space-y-6">
              {student.timeline.map((item: any) => (
                <div key={item._id} className="relative pl-8 sm:pl-10">
                  <div className="absolute left-0 top-2 w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full border-2 sm:border-4 border-white shadow-md"></div>
                  <div className="bg-white border rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base break-words">{item.remark}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {new Date(item.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm sm:text-base text-gray-500">No timeline records available.</p>
          )}
        </Section>

      </div>
    </div>
  );
};

export default ViewApplication;


/* 🔧 COMPONENTS */
const Section = ({ title, icon, children }: any) => (
  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-5 md:p-6 border border-gray-200">
    <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
      <span className="w-5 h-5 sm:w-6 sm:h-6">{icon}</span>
      <span>{title}</span>
    </h2>
    <div className="grid gap-2 sm:gap-3">{children}</div>
  </div>
);

const Field = ({ label, value }: any) => (
  <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0 bg-gray-50 border rounded-xl px-3 sm:px-4 py-2 text-gray-800 text-sm sm:text-base">
    <span className="text-gray-600">{label}</span>
    <span className="font-semibold break-words text-right sm:text-left">{value || "—"}</span>
  </div>
);

const SubTitle = ({ children }: any) => (
  <p className="text-xs sm:text-sm font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2 text-orange-600">{children}</p>
);
