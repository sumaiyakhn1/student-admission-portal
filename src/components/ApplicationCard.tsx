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
        w-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8
        bg-white/60 backdrop-blur-xl
        border border-white/50 shadow-xl
        transition-all hover:shadow-2xl hover:bg-white/70
        flex flex-col gap-4 sm:gap-6 md:gap-8
      "
    >

      {/* -------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------- */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" /> 
          <span>Application Summary</span>
        </h2>

        <p className="text-base sm:text-lg font-semibold text-orange-600 mt-1 tracking-wide break-words">
          {student.applicationNumber}
        </p>
      </div>

      {/* -------------------------------- */}
      {/* APPLICANT DETAILS SECTION */}
      {/* -------------------------------- */}
      <div className="bg-white/50 backdrop-blur-md p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-white/40">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3 sm:mb-4">
          <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" /> 
          <span>Applicant Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-y-3 gap-x-4 text-gray-700 text-sm sm:text-base">
          <p className="flex items-start sm:items-center gap-2 break-words">
            <User size={16} className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-orange-500 flex-shrink-0 mt-0.5 sm:mt-0" /> 
            <span><span className="font-semibold">Name:</span> {student.name}</span>
          </p>

          <p className="flex items-start sm:items-center gap-2 break-words">
            <User size={16} className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-orange-500 flex-shrink-0 mt-0.5 sm:mt-0" />
            <span><span className="font-semibold">Father:</span> {student.fatherName}</span>
          </p>

          <p className="flex items-start sm:items-center gap-2 break-words">
            <Phone size={16} className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-orange-500 flex-shrink-0 mt-0.5 sm:mt-0" />
            <span><span className="font-semibold">Phone:</span> {student.phone}</span>
          </p>

          <p className="flex items-start sm:items-center gap-2 break-words">
            <Mail size={16} className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-orange-500 flex-shrink-0 mt-0.5 sm:mt-0" />
            <span><span className="font-semibold">Email:</span> {student.email}</span>
          </p>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* COURSE & ACADEMIC INFO */}
      {/* -------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-4 sm:gap-x-10 text-gray-700 text-sm sm:text-[15px]">
        <p className="break-words"><span className="font-semibold">🎓 Course:</span> {student.course}</p>
        <p className="break-words"><span className="font-semibold">📚 Stream:</span> {student.stream}</p>
        <p className="break-words"><span className="font-semibold">🎯 Batch:</span> {student.batch}</p>
        <p className="break-words"><span className="font-semibold">🗓️ Session:</span> {student.session}</p>
      </div>

      {/* -------------------------------- */}
      {/* STATUS */}
      {/* -------------------------------- */}
      <div className="flex items-center gap-2 sm:gap-3 mt-1">
        <BadgeCheck size={20} className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-orange-600 flex-shrink-0" />
        <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs sm:text-sm font-semibold tracking-wide break-words">
          {student.currentStage}
        </span>
        
      </div>

      {/* -------------------------------- */}
      {/* CTA BUTTON */}
      {/* -------------------------------- */}
      <button
  onClick={onView}
  className="
    w-full py-2.5 sm:py-3 mt-2
    bg-orange-500 hover:bg-orange-600
    text-white font-semibold rounded-xl sm:rounded-2xl
    text-center text-base sm:text-lg flex justify-center items-center gap-2
    shadow-md hover:shadow-lg transition-all
  "
>
  View Application <ArrowRight size={18} className="sm:w-5 sm:h-5" />
</button>


    </div>
  );
};

export default ApplicationCard;
