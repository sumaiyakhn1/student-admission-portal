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
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFEBD4] pb-32">

      {/* 🔙 Header */}
      <div className="flex items-center gap-3 p-4 shadow-lg bg-white sticky top-0 z-50 border-b">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-xl font-semibold tracking-wide">View Application</h1>
      </div>

      {/* MAIN CONTENT */}
      <div className="p-5 space-y-8">

        {/* PROFILE HEADER */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex items-center justify-between border">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
            <p className="text-gray-600 text-sm mt-1">{student.phone}</p>
            <p className="text-gray-600 text-sm">{student.email}</p>
          </div>
          <div className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md">
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
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-xl shadow hover:bg-orange-600"
            onClick={() => navigate("/payments")}
          >
            View Payments →
          </button>
        </Section>

        {/* TIMELINE */}
        <Section icon={<Clock className="text-orange-500" />} title="Application Timeline">
          {student.timeline?.length ? (
            <div className="w-full col-span-2 space-y-6">
              {student.timeline.map((item: any) => (
                <div key={item._id} className="relative pl-10">
                  <div className="absolute left-0 top-2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-md"></div>
                  <div className="bg-white border rounded-2xl p-4 shadow-sm">
                    <p className="font-semibold text-gray-800">{item.remark}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(item.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No timeline records available.</p>
          )}
        </Section>

      </div>
    </div>
  );
};

export default ViewApplication;


/* 🔧 COMPONENTS */
const Section = ({ title, icon, children }: any) => (
  <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200">
    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
      {icon} {title}
    </h2>
    <div className="grid gap-3">{children}</div>
  </div>
);

const Field = ({ label, value }: any) => (
  <div className="flex justify-between bg-gray-50 border rounded-xl px-4 py-2 text-gray-800">
    <span>{label}</span>
    <span className="font-semibold">{value || "—"}</span>
  </div>
);

const SubTitle = ({ children }: any) => (
  <p className="text-sm font-semibold mt-4 mb-1 text-orange-600">{children}</p>
);
