import API from "./api";

/**
 * SAVE / EDIT admission application
 * ⚠️ Sends FULL application object
 */
export const saveAdmissionApplication = async (payload: any) => {
  const res = await API.post(
    "/edit/admissionStudentData",
    payload
  );
  return res.data;
};
