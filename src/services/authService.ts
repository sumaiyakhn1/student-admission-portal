// src/services/authService.ts

const BASE_URL = "https://staging.odpay.in/api";

/* --------------------------------------
   SEND OTP
---------------------------------------- */
export const sendOtp = async (mobile: string) => {
  const res = await fetch(
    `${BASE_URL}/sendLogin/otp?mobile=${mobile}`
  );

  if (!res.ok) {
    throw new Error("Failed to send OTP");
  }

  return res.json();
};

/* --------------------------------------
   VERIFY OTP
---------------------------------------- */
export const verifyOtp = async (mobile: string, otp: string) => {
  const res = await fetch(
    `${BASE_URL}/verify/otp?mobile=${mobile}&otp=${otp}&source=erp`
  );

  if (!res.ok) {
    throw new Error("OTP verification failed");
  }

  return res.json();
};

/* --------------------------------------
   PORTAL LOGIN (Bypass for Token)
---------------------------------------- */
const PORTAL_MOBILE = "7840090807";
const PORTAL_PASSWORD = "7840090807";

export const portalLogin = async () => {
  const res = await fetch(`https://staging.odpay.in/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobile: PORTAL_MOBILE,
      password: PORTAL_PASSWORD,
    }),
  });

  if (!res.ok) {
    throw new Error("Portal login failed");
  }

  return res.json();
};

