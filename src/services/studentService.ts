import API from "./api";

// Hardcoded student ID - single source of truth
// const STUDENT_ID = "68cbb88261a2e3000eec354f";
// const STUDENT_ID = "695b75cae851a0000f795249";
// const STUDENT_ID = "695bd2784fda15000f3c9704"; //ritika ayush
// const STUDENT_ID = "6912e561240b5e000e10ef96"; //timt
// const STUDENT_ID = "694234d6fcc09c000f4f8270"; //vedashree
// const STUDENT_ID = "6919cc57878120000f65e5a4"; //vedashree
const STUDENT_ID = "69319236e9dafd000ea27b8b"; //vedashree

export const getStudentById = (id?: string) => {
  const studentId = id || STUDENT_ID;
  console.log("📞 Calling student API");
  return API.get(`/view/admissionStudentData?id=${studentId}`);
};
