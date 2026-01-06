// src/components/timeline/PaymentSummary.tsx
const PaymentSummary = ({ student }: any) => {
    if (!student.payment) {
      return <p className="text-xs sm:text-sm text-gray-500">No payment recorded.</p>;
    }
  
    return (
      <div className="space-y-2 text-xs sm:text-sm">
        <p className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0">
          <span className="text-gray-600">Amount:</span>
          <span className="font-semibold text-green-600">₹{student.payment.amount}</span>
        </p>
        <p className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0">
          <span className="text-gray-600">Status:</span>
          <span className="font-semibold text-blue-600">{student.payment.status}</span>
        </p>
      </div>
    );
  };
  
  export default PaymentSummary;
  