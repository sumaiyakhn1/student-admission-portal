import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  GraduationCap,
  Layers,
  ClipboardList,
  User,
  Phone,
  Mail,
  UserCheck,
} from "lucide-react";

interface ApplicationCardProps {
  student: any;
  onView?: () => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ student, onView }) => {
  return (
    <div
      className="
        w-full rounded-3xl p-8
        bg-white/60 backdrop-blur-xl
        border border-white/50 shadow-xl
        transition-all hover:shadow-2xl hover:bg-white/70
        flex flex-col gap-8
      "
    >

      {/* -------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------- */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ClipboardList className="text-orange-500" /> Application Summary
        </h2>

        <p className="text-lg font-semibold text-orange-600 mt-1 tracking-wide">
          {student.applicationNumber}
        </p>
      </div>

      {/* -------------------------------- */}
      {/* APPLICANT DETAILS SECTION */}
      {/* -------------------------------- */}
      <div className="bg-white/50 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-white/40">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <UserCheck className="text-orange-500" /> Applicant Details
        </h3>

        <div className="grid grid-cols-2 gap-y-3 text-gray-700">
          <p className="flex items-center gap-2">
            <User size={18} className="text-orange-500" /> 
            <span className="font-semibold">Name:</span> {student.name}
          </p>

          <p className="flex items-center gap-2">
            <User size={18} className="text-orange-500" />
            <span className="font-semibold">Father:</span> {student.fatherName}
          </p>

          <p className="flex items-center gap-2">
            <Phone size={18} className="text-orange-500" />
            <span className="font-semibold">Phone:</span> {student.phone}
          </p>

          <p className="flex items-center gap-2">
            <Mail size={18} className="text-orange-500" />
            <span className="font-semibold">Email:</span> {student.email}
          </p>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* COURSE & ACADEMIC INFO */}
      {/* -------------------------------- */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-10 text-gray-700 text-[15px]">
        <p><span className="font-semibold">🎓 Course:</span> {student.course}</p>
        <p><span className="font-semibold">📚 Stream:</span> {student.stream}</p>
        <p><span className="font-semibold">🎯 Batch:</span> {student.batch}</p>
        <p><span className="font-semibold">🗓️ Session:</span> {student.session}</p>
      </div>

      {/* -------------------------------- */}
      {/* STATUS */}
      {/* -------------------------------- */}
      <div className="flex items-center gap-3 mt-1">
        <BadgeCheck size={22} className="text-orange-600" />
        <span className="px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold tracking-wide">
          {student.currentStage}
        </span>
        
      </div>

      {/* -------------------------------- */}
      {/* CTA BUTTON */}
      {/* -------------------------------- */}
      <button
  onClick={onView}
  className="
    w-full py-3 mt-2
    bg-orange-500 hover:bg-orange-600
    text-white font-semibold rounded-2xl
    text-center text-lg flex justify-center items-center gap-2
    shadow-md hover:shadow-lg transition-all
  "
>
  View Application <ArrowRight size={20} />
</button>


    </div>
  );
};

export default ApplicationCard;
