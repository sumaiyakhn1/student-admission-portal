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
    <div className="bg-[#FFF8F0] min-h-screen p-3 sm:p-4 md:p-6 pb-20 sm:pb-24">
      <Header studentName="Payments" />

      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 mt-2">Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-sm sm:text-base text-gray-500">No payment records found.</p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {payments.map((txn, index) => (
            <div key={index} className="bg-white p-3 sm:p-4 rounded-xl shadow-md border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-base">
                <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium">Receipt ID:</span>
                  <span className="font-semibold break-all text-right sm:text-left">{txn.receiptId}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium">Amount Paid:</span>
                  <span className="font-semibold text-green-600">₹{txn.totalPaidAmount}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium">Status:</span>
                  <span className="font-semibold text-blue-600">{txn.status}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium">Date:</span>
                  <span className="text-gray-700">{new Date(txn.date).toLocaleDateString()}</span>
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
