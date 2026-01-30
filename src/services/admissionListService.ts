import API from "./api";

const ENTITY_ID = "5e95a8d3eac1df35dd2d007f";
const SESSION = "2022-23";
const MOBILE = "9416885962"; // hardcoded for now (phone to search by)

// List admission students by phone
export const listAdmissionStudents = () => {
  console.log("📞 Calling admission list API (admissionStudentData)");

  return API.post("/list/admissionStudentData", {
    entity: ENTITY_ID,
    session: SESSION,
    search: MOBILE,
    searchBy: "phone",
    pageNumber: 1,
    pageSize: 10,
  });
};

