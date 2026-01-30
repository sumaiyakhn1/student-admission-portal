import { useEffect, useState } from "react";
import Header from "../components/Header";
import FooterTabs from "../components/FooterTabs";
import { listAdmissionStudents } from "../services/admissionListService";

const Payments = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const res = await listAdmissionStudents();
        const applications = res.data?.data || [];

        // 🔥 FLATTEN PAYMENTS FROM ALL APPLICATIONS
        const flattenedPayments = applications.flatMap((app: any) =>
          (app.transactions || []).map((txn: any) => ({
            studentName: app.name,
            applicationNumber: app.applicationNumber,
            stage: txn.stage,
            receiptId: txn.receiptId,
            amount: txn.totalPaidAmount,
            status: txn.status,
            date: txn.date,
            applicationId: app._id,
          }))
        );

        setPayments(flattenedPayments);
      } catch (e) {
        console.error("❌ Payment load error", e);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  return (
    <div className="bg-[#FFF8F0] min-h-screen p-4 pb-24">
      <Header studentName="Payments" />

      <h2 className="text-xl font-bold mb-4 mt-2">
        Payment History
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading payments…</p>
      ) : payments.length === 0 ? (
        <p className="text-gray-500">No payment records found.</p>
      ) : (
        <div className="space-y-3">
          {payments.map((p, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow border text-sm"
            >
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-gray-500">Student</span>
                  <p className="font-semibold">{p.studentName}</p>
                </div>

                <div>
                  <span className="text-gray-500">Application</span>
                  <p className="font-semibold">{p.applicationNumber}</p>
                </div>

                <div>
                  <span className="text-gray-500">Stage</span>
                  <p>{p.stage}</p>
                </div>

                <div>
                  <span className="text-gray-500">Amount</span>
                  <p className="font-semibold text-green-600">
                    ₹{p.amount}
                  </p>
                </div>

                <div>
                  <span className="text-gray-500">Status</span>
                  <p className="text-blue-600">{p.status}</p>
                </div>

                <div>
                  <span className="text-gray-500">Date</span>
                  <p>{new Date(p.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <FooterTabs />
    </div>
  );
};

export default Payments;
