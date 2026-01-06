import API from "./api";

const ENTITY_ID = "674e93bcb3c482001328e064";
const SESSION = "2025-26";
const MOBILE = "9992234736"; // hardcoded for now


export const listAdmissionStudents = () => {
  console.log("📞 Calling admission list API");

  return API.post("/list/admissionStudent", {
    search: MOBILE,
    searchBy: "phone",
    entity: ENTITY_ID,
    session: SESSION,
    pageNumber: 1,
    pageSize: 10,
    memberDetails: false,
  });
};
