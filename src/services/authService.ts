// src/services/authService.ts

const BASE_URL = "https://staging.odpay.in/api";

/* --------------------------------------
   SEND OTP (REAL API)
---------------------------------------- */
export const sendOtp = async (mobile: string) => {
  const res = await fetch(`${BASE_URL}/sendLogin/otp?mobile=${mobile}`);

  if (!res.ok) {
    throw new Error("Failed to send OTP");
  }

  return res.json();
};

/* --------------------------------------
   VERIFY OTP (UI-ONLY GATE)
---------------------------------------- */
/**
 * ⚠️ IMPORTANT:
 * Backend does NOT return a JWT token yet.
 * So this function only simulates OTP verification success
 * and allows UI navigation.
 *
 * NO TOKEN is created or stored here.
 */
export const verifyOtp = async (_mobile: string, _otp: string) => {
  // In real backend, this will be:
  // POST /verifyOtp → { token }

  return {
    status: "success",
  };
};
