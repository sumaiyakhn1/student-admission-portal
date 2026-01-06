import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getStudentById } from "../services/studentService";
import FooterTabs from "../components/FooterTabs";

/* -----------------------------------------
   FIELD GROUP CONFIG
------------------------------------------ */
const GROUPS: Record<string, string[]> = {
  "Personal Details": [
    "name",
    "dob",
    "gender",
    "phone",
    "email",
    "nationality",
    "religion",
    "socialCategory",
  ],

  "Address Details": [
    "address",
    "city",
    "state",
    "country",
    "pinCode",
  ],

  "Parent Details": [
    "fatherName",
    "fatherMobile",
    "motherName",
    "motherMobile",
  ],

  "Academic Details": [
    "course",
    "stream",
    "batch",
    "session",
  ],

  "Education – 10th": [
    "educationDetails1School",
    "educationDetails1Board",
    "educationDetails1Percentage",
    "educationDetails1PassingYear",
  ],

  "Education – 12th": [
    "educationDetails2School",
    "educationDetails2University",
    "educationDetails2Percentage",
    "educationDetails2PassingYear",
  ],

  "Graduation / Diploma": [
    "educationDetails3University",
    "educationDetails3Percentage",
    "educationDetails3PassingYear",
  ],

  "Other Information": [
    "customField1",
    "bloodGroup",
    "height",
    "weight",
    "oldNew",
    "source",
  ],
};

/* -----------------------------------------
   UTILITIES
------------------------------------------ */
const formatLabel = (key: string) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase());

const formatValue = (value: any) => {
  if (!value) return "—";

  if (typeof value === "string" && value.includes("T")) {
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d.toLocaleDateString();
  }

  return String(value);
};

/* -----------------------------------------
   COMPONENT
------------------------------------------ */
const Profile = () => {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getStudentById();
        setStudent(res.data);
      } catch (e) {
        console.error("Profile load failed", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading profile…</div>;
  }

  if (!student) {
    return <div className="p-6 text-red-500">No student data found</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-20 sm:pb-24">
      <Header studentName={student.name} />

      <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 md:space-y-8">
        <h1 className="text-xl sm:text-2xl font-bold">Student Profile</h1>

        {Object.entries(GROUPS).map(([group, keys]) => {
          const visibleKeys = keys.filter((k) => student[k]);

          if (visibleKeys.length === 0) return null;

          return (
            <div
              key={group}
              className="bg-white rounded-xl sm:rounded-2xl border shadow-sm p-4 sm:p-5 md:p-6"
            >
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{group}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                {visibleKeys.map((key) => {
                  const k = String(key);

                  return (
                    <div
                      key={k}
                      className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0 border rounded-lg px-3 sm:px-4 py-2 bg-gray-50"
                    >
                      <span className="text-gray-600">
                        {formatLabel(k)}
                      </span>
                      <span className="font-medium text-gray-900 break-words text-right sm:text-left">
                        {formatValue(student[k])}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <FooterTabs />
    </div>
  );
};

export default Profile;
