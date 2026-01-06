import { useEffect, useState } from "react";
import Header from "../components/Header";
import { getStudentById } from "../services/studentService";
import FooterTabs from "../components/FooterTabs";

const Payments = () => {
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    console.log("📌 Payments Page Loaded");

    const fetchPayments = async () => {
      console.log("📡 Fetching payment records...");

      try {
        const res = await getStudentById();
        console.log("📥 Full API Response:", res);

        const transactions = res.data?.transactions || [];
        console.log("🧾 Transactions found:", transactions);
        setPayments(transactions);
        
      } catch (err: any) {
        console.log("❌ Payment API Error =>", err.response ? err.response.data : err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="bg-[#FFF8F0] min-h-screen p-6">
      <Header studentName="Payments" />

      <h2 className="text-2xl font-bold mb-4">Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">No payment records found.</p>
      ) : (
        <div className="space-y-4">
          {payments.map((txn, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-md border">
              <p><strong>Receipt ID:</strong> {txn.receiptId}</p>
              <p><strong>Amount Paid:</strong> ₹{txn.totalPaidAmount}</p>
              <p><strong>Status:</strong> {txn.status}</p>
              <p><strong>Date:</strong> {new Date(txn.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
      <FooterTabs />
    </div>
  );
};

export default Payments;
