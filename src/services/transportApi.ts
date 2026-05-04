import axios from "axios";

const ENTITY_ID = "6608ec3120337200120f347e";
const SESSION = "2025-26 Odd";
const TRANSPORT_BASE_URL = "https://staging.odpay.in/api";

/**
 * Fetch all transport routes and pickup points
 */
export const getTransportRoutes = async (): Promise<any> => {
    const token = sessionStorage.getItem("authToken");
    const headers: any = {};
    if (token) {
        headers.Authorization = token;
    }
    const res = await axios.get(`${TRANSPORT_BASE_URL}/list/vehicleRoute?entity=${ENTITY_ID}&session=${encodeURIComponent(SESSION)}`, { headers });
    return res.data;
};

/**
 * Assign transport to student
 */
export const assignTransport = async (payload: { studentId: string; routeName: string; pickupPoint: string; amount: number }): Promise<any> => {
    const token = sessionStorage.getItem("authToken");
    const headers: any = {};
    if (token) {
        headers.Authorization = token;
    }
    const res = await axios.post(`${TRANSPORT_BASE_URL}/assignTransport/student`, payload, { headers });
    return res.data;
};
