import API from "./api";

// ─── Constants ────────────────────────────────────────────────────────────────
const ODPAY_BASE = "https://api.okiedokiepay.com";
export const ERP_ENTITY_ID = "698c2eed0ddb62000fef6822";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getStudentToken = (): string =>
  sessionStorage.getItem("authToken") || "";

const getToken = (): string =>
  sessionStorage.getItem("token") || "";

const getStudentProfile = () => {
  try {
    const raw = sessionStorage.getItem("userProfile");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

/**
 * Resolve the correct payment amount & receipt heads for this student.
 *
 * 1. If `txnMapping` exists, find the entry matching student.course + student.stream.
 *    - Use `entry.amount` and build receipt from `entry.headData`.
 * 2. Fallback: use `stageSetup.totalPaybleAmount` + `stageSetup.receipt`.
 */
export const resolveTxnAmount = (
  stageSetup: any,
  student: any
): { amount: number; receipt: any[] } => {
  const txnMapping: any[] = stageSetup?.txnMapping ?? [];

  if (txnMapping.length > 0 && student?.course && student?.stream) {
    const norm = (s: string) => s?.trim().toLowerCase() ?? "";
    const match = txnMapping.find(
      (m: any) =>
        norm(m.course) === norm(student.course) &&
        norm(m.stream) === norm(student.stream)
    );

    if (match) {
      const receipt = (match.headData ?? []).map((h: any) => ({
        admissionHead: h.admissionHead,
        paidAmount: h.headAmount ?? 0
      }));
      return { amount: match.amount ?? 0, receipt };
    }
  }

  // Fallback — global stage amount
  return {
    amount: stageSetup?.totalPaybleAmount ?? 0,
    receipt: stageSetup?.receipt ?? [],
  };
};



const odpayPost = async (path: string, body: any) => {
  const res = await fetch(`${ODPAY_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || `ODPay ${path} failed (${res.status})`);
  }
  return res.json();
};

const odpayGet = async (path: string) => {
  const res = await fetch(`${ODPAY_BASE}${path}`, {
    headers: { Authorization: getToken() },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || `ODPay GET ${path} failed (${res.status})`);
  }
  return res.json();
};

// ─── ERP API ─────────────────────────────────────────────────────────────────

/**
 * Fetch stage setup details (totalPaybleAmount, receipt[], fields)
 */
export const viewStageSetup = (stageId: string) =>
  API.get(`/view/admissionStageSetup?id=${stageId}`);

// ─── ODPay API ────────────────────────────────────────────────────────────────

/**
 * Resolve ERP entity ID → ODPay entity ID
 */
export const getEntityForERP = (erpEntityId: string = ERP_ENTITY_ID) =>
  odpayGet(`/api/getEntityForERP/entity?odErpEntityId=${erpEntityId}`);

/**
 * Search student record on ODPay (returns chargesCategory, amountDue, minAmt…)
 */
export const searchStudent = (
  odPayEntityId: string,
  enrollmentNumber: string,
  session: string
) =>
  odpayPost("/api/search/student", {
    entity: odPayEntityId,
    enrollmentNumber,
    erpSession: session,
    // erpTransactionType: "admission",
  });

/**
 * Check if a recent payment is already pending for this enrollment
 */
export const recentPaymentCheck = (
  odPayEntityId: string,
  enrollmentNumber: string,
  amount: number
) => {
  const profile = getStudentProfile();
  return odpayPost("/api/recentPaymentCheck/payment", {
    entity: odPayEntityId,
    enrollmentNumber,
    installmentAmount: amount,
    total: amount,
    user: profile.email || "",
    userMobile: profile.phone || "",
    // userId: profile._id || "",
  });
};

/**
 * Apply gateway charges to the amount and get final breakdown
 */
export const applyCharges = (
  odPayEntityId: string,
  paymentGateway: string,
  paymentMode: string,
  amount: number
) =>
  odpayPost("/api/apply/chargesCategory", {
    paymentGateway,
    paymentMode,
    entity: odPayEntityId,
    amount,
  });

/**
 * Initiate transaction — returns Razorpay order { key, amount, id }
 */
export const initiateTxn = (payload: {
  odPayEntityId: string;
  enrollmentNumber: string;
  name: string;
  meta: any;
  amount: number;
  paymentGateway: string;
  paymentMode: string;
  receiptArr: any[];
  remark: string;
  session: string;
}) => {
  const profile = getStudentProfile();
  return odpayPost("/api/initiateTxn/payment", {
    entity: payload.odPayEntityId,
    enrollmentNumber: payload.enrollmentNumber,
    name: payload.name,
    meta: payload.meta,
    installmentAmount: payload.amount,
    totalAmount: payload.amount,
    amount: payload.amount,
    total: payload.amount,
    paymentGateway: payload.paymentGateway,
    paymentMode: payload.paymentMode,
    user: profile.email || "",
    userId: profile._id || "",
    userMobile: profile.phone || "",
    requestMode: "student",
    erpReceiptArr: payload.receiptArr,
    erpRemark: payload.remark,
    erpSession: payload.session,
    erpTransactionType: "admission",
  });
};

/**
 * Process / capture payment after Razorpay SDK callback
 */
export const processPayment = (
  razorpayResponse: any,
  paymentGateway: string = "razorpay"
) =>
  odpayPost("/api/process/payment", {
    ...razorpayResponse,
    paymentGateway,
  });
