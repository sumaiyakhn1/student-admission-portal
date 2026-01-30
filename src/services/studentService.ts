import API from "./api";

// Fallback student ID (used only if nothing is selected)
// const STUDENT_ID = "68cbb88261a2e3000eec354f";
// const STUDENT_ID = "695b75cae851a0000f795249";
// const STUDENT_ID = "695bd2784fda15000f3c9704"; //ritika ayush
// const STUDENT_ID = "6912e561240b5e000e10ef96"; //timt
// const STUDENT_ID = "694234d6fcc09c000f4f8270"; //vedashree
// const STUDENT_ID = "6919cc57878120000f65e5a4"; //vedashree
const STUDENT_ID = "694045670c74ec001061f199"; // default fallback

export const getStudentById = (id?: string) => {
  // Prefer explicit id, then sessionStorage selection, then fallback constant
  const selectedFromSession =
    typeof window !== "undefined"
      ? sessionStorage.getItem("selectedStudentId")
      : null;

  const studentId = id || selectedFromSession || STUDENT_ID;

  console.log("📞 Calling student API for id:", studentId);
  return API.get(`/view/admissionStudentData?id=${studentId}`);
};

