const PaymentSummary = ({ student, stage }: any) => {
  const paymentsForStage =
    student?.transactions?.filter((txn: any) =>
      txn.stage?.trim().toLowerCase() ===
      stage.stage?.trim().toLowerCase()
    ) || [];

  if (paymentsForStage.length === 0) {
    return (
      <p className="text-xs sm:text-sm text-gray-500">
        No payment recorded for this stage.
      </p>
    );
  }

  return (
    <div className="space-y-2 text-xs sm:text-sm">
      {paymentsForStage.map((txn: any) => (
        <div
          key={txn._id}
          className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0 border rounded-lg px-3 py-2 bg-gray-50"
        >
          <span className="text-gray-600">
            Receipt: {txn.receiptId}
          </span>
          <span className="font-semibold text-green-600">
            ₹{txn.totalPaidAmount}
          </span>
          <span className="font-semibold text-blue-600">
            {txn.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PaymentSummary;
