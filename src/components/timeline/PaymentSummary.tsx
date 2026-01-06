// src/components/timeline/PaymentSummary.tsx
const PaymentSummary = ({ student }: any) => {
    if (!student.payment) {
      return <p className="text-gray-500">No payment recorded.</p>;
    }
  
    return (
      <div>
        <p>Amount: ₹{student.payment.amount}</p>
        <p>Status: {student.payment.status}</p>
      </div>
    );
  };
  
  export default PaymentSummary;
  