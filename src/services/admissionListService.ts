import API from "./api";

const ENTITY_ID = "6608ec3120337200120f347e";
const SESSION = "2025-26 Odd";
// Helper to get logged-in user's phone
export const getUserMobile = () => {
  try {
    const userProfile = sessionStorage.getItem("userProfile");
    if (!userProfile) return "";
    const parsed = JSON.parse(userProfile);
    return parsed.phone || parsed.mobile || "";
  } catch (error) {
    console.error("Error parsing user profile:", error);
    return "";
  }
};

// List admission students by phone
export const listAdmissionStudents = () => {
  const mobile = getUserMobile();
  console.log("📞 Calling admission list API (admissionStudentData) for:", mobile);

  return API.post("/list/admissionStudentData", {
    entity: ENTITY_ID,
    session: SESSION,
    search: mobile,
    searchBy: "phone",
    pageNumber: 1,
    pageSize: 10,
  });
};

