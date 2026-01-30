import axios from "axios";

const API = axios.create({
  baseURL: "https://staging.odpay.in/api",
  headers: {
    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU3VtYWl5YSBLaGFuIiwibW9iaWxlIjoiNzcwNTAzMzA0MCIsInBhc3N3b3JkIjoiNzcwNTAzMzA0MCIsImVudGl0eSI6IjVlZmVlYzEwYjI0ODE2Nzg3MmIzOWVmZSIsImVtcGxveWVlIjoiNjhhNDY4NGYxMjU1ZmEwMDBmNmUyZWI0IiwiZW1wbG95ZWVJZCI6IlN1bWFpeWEiLCJlbXBsb3llZVR5cGUiOiJJbnRlcm4iLCJlbXBsb3llZVBob3RvIjoiL2Fzc2V0cy8vbWVkaWEvYXZhdGFycy93b21lbjMuc3ZnIiwidXNlclR5cGUiOiJvZDMiLCJzdGF0dXMiOnRydWUsInBlcm1pc3Npb25Hcm91cE5hbWUiOiJJbnRlcm4iLCJlbnRpdHlHcm91cCI6W3siZW50aXR5SWQiOiI1ZWZlZWMxMGIyNDgxNjc4NzJiMzllZmUiLCJuYW1lIjoiVGVhbSBPa2llIERva2llIiwiZGlzcGxheU5hbWUiOiJUZWFtIE9raWUgRG9raWUiLCJxYWMiOiJPa2llIERva2llIiwiZW50aXR5VHlwZSI6InNjaG9vbCIsImxvZ28iOiJodHRwczovL29raWVkb2tpZS1lcnAtaW1hZ2VzLnMzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS9Pa2llJTIwRG9raWUvMjAyMC8wNy9sb2dvL2IyNWM3NWJjZDI2MDRhOWRhMWJjLWxvZ29fMS5wbmcifV0sIl9pZCI6IjY4YTQ2ODRmMTI1NWZhMDAwZjZlMmViNSIsInRva2VuVmVyc2lvbiI6NDksImlhdCI6MTc1NTYwNTA3MX0.sKZ7pnDLRWzdWHbAf_jePAbYXiBF946DKutB5Sen98Q`
  },
});

export default API;

// import axios from "axios";

// // Helper function to get token from sessionStorage
// const getAuthToken = () => {
//   return sessionStorage.getItem("authToken") || "";
// };

// const API = axios.create({
//   baseURL: "https://staging.odpay.in/api",
// });

// // Add request interceptor to dynamically set Authorization header
// API.interceptors.request.use(
//   (config) => {
//     const token = getAuthToken();
//     if (token) {
//       config.headers.Authorization = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default API;
