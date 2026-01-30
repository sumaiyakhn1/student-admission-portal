// src/services/authService.ts

const BASE_URL = "https://api.okiedokiepay.com";

/* --------------------------------------
   SEND OTP
---------------------------------------- */
export const sendOtp = async (phone: string) => {
  const res = await fetch(`${BASE_URL}/sendLoginOTP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send OTP");
  }

  return res.json();
};

/* --------------------------------------
   VERIFY OTP
---------------------------------------- */
export const verifyOtp = async (phone: string, otp: string) => {
  const res = await fetch(`${BASE_URL}/loginWithOTP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
      otp,
    }),
  });

  if (!res.ok) {
    throw new Error("OTP verification failed");
  }

  return res.json();
};




// // src/services/authService.ts

// const BASE_URL = "https://staging.odpay.in/api";

// /* SEND OTP  */
// export const sendOtp = async (mobile: string) => {
//   const res = await fetch(
//     `${BASE_URL}/sendLogin/otp?mobile=${mobile}`
//   );

//   if (!res.ok) {
//     throw new Error("Failed to send OTP");
//   }

//   return res.json();
// };

// /*  VERIFY OTP */
// export const verifyOtp = async (mobile: string, otp: string) => {
//   const res = await fetch(
//     `${BASE_URL}/verify/otp?mobile=${mobile}&otp=${otp}&source=erp`
//   );

//   if (!res.ok) {
//     throw new Error("OTP verification failed");
//   }

//   return res.json();
// };
