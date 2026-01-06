// import React from "react";

// /* =========================
//    TYPES
// ========================= */

// interface Props {
//   stage: any;
//   student: any;
// }

// /* =========================
//    SMALL UI FIELD COMPONENT
// ========================= */

// const Field = ({
//   label,
//   value,
// }: {
//   label: string;
//   value: any;
// }) => {
//   return (
//     <div className="space-y-1">
//       <p className="text-xs text-gray-500">{label}</p>
//       <p className="text-sm font-medium text-gray-900">
//         {value ?? "-"}
//       </p>
//     </div>
//   );
// };

// /* =========================
//    HELPERS
// ========================= */

// const groupFields = (fields: any[]) => {
//   return fields.reduce((acc: any, field: any) => {
//     const group = field.groupBy || "Other Details";
//     if (!acc[group]) acc[group] = [];
//     acc[group].push(field);
//     return acc;
//   }, {});
// };

// const formatValue = (value: any, type: string) => {
//   if (value === undefined || value === null || value === "") {
//     return "-";
//   }

//   if (type === "date") {
//     return new Date(value).toLocaleDateString();
//   }

//   if (type === "toggle") {
//     return value ? "Yes" : "No";
//   }

//   return value;
// };

// /* =========================
//    MAIN COMPONENT
// ========================= */

// const StageDetails: React.FC<Props> = ({ stage, student }) => {
//   const groupedFields = groupFields(stage?.fields || []);

//   return (
//     <div className="bg-white rounded-2xl p-6 space-y-8 border border-gray-200">

//       {/* ================= STATUS ROW ================= */}
//       <div className="flex justify-between items-center text-sm">
//         <span
//           className={`font-semibold ${
//             student?.currentStageSequence >= stage.sequence
//               ? "text-green-600"
//               : "text-gray-500"
//           }`}
//         >
//           {student?.currentStageSequence >= stage.sequence
//             ? "Completed"
//             : "Pending"}
//         </span>

//         <span className="text-gray-400">
//           {student?.updatedAt
//             ? new Date(student.updatedAt).toLocaleString()
//             : ""}
//         </span>
//       </div>

//       {/* ================= FIELD DATA ================= */}
//       {Object.keys(groupedFields).length > 0 ? (
//         Object.entries(groupedFields).map(
//           ([groupName, fields]: any) => (
//             <div key={groupName}>
//               <h4 className="text-sm font-semibold text-gray-700 mb-4">
//                 {groupName}
//               </h4>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 {fields.map((field: any) => (
//                   <Field
//                     key={field._id}
//                     label={field.displayName}
//                     value={formatValue(
//                       student?.[field.key],
//                       field.fieldType
//                     )}
//                   />
//                 ))}
//               </div>
//             </div>
//           )
//         )
//       ) : (
//         <p className="text-sm text-gray-500">
//           No additional details available.
//         </p>
//       )}

//       {/* ================= PAYMENT SUMMARY ================= */}
//     {/* ================= PAYMENT SUMMARY ================= */}
// {student?.transactions?.length > 0 && (
//   <div>
//     <h4 className="text-sm font-semibold text-gray-700 mb-4">
//       Payment Summary
//     </h4>

//     {student.transactions
//       .filter((txn: any) => txn.stage === stage.stage)
//       .map((txn: any) => (
//         <div
//           key={txn._id}
//           className="bg-gray-50 border rounded-xl p-4 space-y-2 text-sm"
//         >
//           <div className="flex justify-between">
//             <span className="text-gray-600">Receipt ID</span>
//             <span className="font-medium">{txn.receiptId}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-gray-600">Amount Paid</span>
//             <span className="font-semibold text-gray-900">
//               ₹ {txn.totalPaidAmount}
//             </span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-gray-600">Status</span>
//             <span className="font-semibold text-green-600">
//               {txn.status}
//             </span>
//           </div>

//           <div className="flex justify-between">
//             <span className="text-gray-600">Date</span>
//             <span className="text-gray-500">
//               {new Date(txn.date).toLocaleString()}
//             </span>
//           </div>
//         </div>
//       ))}
//   </div>
// )}

//     </div>
//   );
// };

// export default StageDetails;
import React from "react";

/* =========================
   TYPES
========================= */

interface Props {
  stage: any;
  student: any;
}

/* =========================
   SMALL UI FIELD COMPONENT (Same UI as Profile page)
========================= */

const Field = ({ label, value }: { label: string; value: any }) => {
  // Don't render if value is null or empty
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0 border rounded-lg px-3 sm:px-4 py-2 bg-gray-50">
      <span className="text-gray-600 text-xs sm:text-sm">
        {label}
      </span>
      <span className="font-medium text-gray-900 break-words text-right sm:text-left text-xs sm:text-sm">
        {value}
      </span>
    </div>
  );
};

/* =========================
   HELPERS
========================= */

const groupFields = (fields: any[]) => {
  return fields.reduce((acc: any, field: any) => {
    const group = field.groupBy || "Other Details";
    if (!acc[group]) acc[group] = [];
    acc[group].push(field);
    return acc;
  }, {});
};

const formatValue = (value: any, type: string) => {
  if (value === undefined || value === null || value === "") {
    return null; // Return null for empty values instead of "-"
  }

  if (type === "date") {
    return new Date(value).toLocaleDateString();
  }

  if (type === "toggle") {
    return value ? "Yes" : "No";
  }

  return value;
};

// Helper to check if a value is filled
const isValueFilled = (value: any): boolean => {
  if (value === null || value === undefined || value === "") {
    return false;
  }
  // Check if it's a string with only whitespace
  if (typeof value === "string" && value.trim() === "") {
    return false;
  }
  return true;
};

/* =========================
   MAIN COMPONENT
========================= */

const StageDetails: React.FC<Props> = ({ stage, student }) => {
  // Filter fields to only include those with filled values
  const allFields = stage?.fields || [];
  const filledFields = allFields.filter((field: any) => {
    const value = student?.[field.key];
    return isValueFilled(value);
  });

  // Group only filled fields
  const groupedFields = groupFields(filledFields);
  
  // Filter out groups that have no fields (shouldn't happen, but safety check)
  const filteredGroupedFields = Object.entries(groupedFields).filter(
    ([_, fields]: any) => fields.length > 0
  );

  const currentSeq = student?.currentStageSequence ?? 0;

  const statusText =
    stage.sequence < currentSeq
      ? "Completed"
      : stage.sequence === currentSeq
      ? "In Progress"
      : "Pending";

  const statusColor =
    stage.sequence < currentSeq
      ? "text-green-600"
      : stage.sequence === currentSeq
      ? "text-blue-600"
      : "text-gray-500";

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-6 sm:space-y-8 border border-gray-200">

      {/* ================= STATUS ROW ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 text-xs sm:text-sm">
        <span className={`font-semibold ${statusColor}`}>
          {statusText}
        </span>

        <span className="text-gray-400 text-xs sm:text-sm break-words">
          {student?.updatedAt
            ? new Date(student.updatedAt).toLocaleString()
            : ""}
        </span>
      </div>

      {/* ================= FIELD DATA ================= */}
      {filteredGroupedFields.length > 0 ? (
        filteredGroupedFields.map(
          ([groupName, fields]: any) => (
            <div key={groupName}>
              <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                {groupName}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {fields.map((field: any) => {
                  const formattedValue = formatValue(
                    student?.[field.key],
                    field.fieldType
                  );
                  // Only render if value is filled (not null)
                  if (formattedValue === null) return null;
                  
                  return (
                    <Field
                      key={field._id}
                      label={field.displayName}
                      value={formattedValue}
                    />
                  );
                })}
              </div>
            </div>
          )
        )
      ) : (
        <p className="text-xs sm:text-sm text-gray-500">
          No additional details available.
        </p>
      )}

      {/* ================= PAYMENT SUMMARY ================= */}
      {student?.transactions?.length > 0 && (
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4">
            Payment Summary
          </h4>

          {student.transactions
            .filter((txn: any) => txn.stage === stage.stage)
            .map((txn: any) => (
              <div
                key={txn._id}
                className="bg-gray-50 border rounded-xl p-3 sm:p-4 space-y-2 text-xs sm:text-sm"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0">
                  <span className="text-gray-600">Receipt ID</span>
                  <span className="font-medium break-all text-right sm:text-left">{txn.receiptId}</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="font-semibold text-gray-900">
                    ₹ {txn.totalPaidAmount}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0">
                  <span className="text-gray-600">Status</span>
                  <span className="font-semibold text-green-600">
                    {txn.status}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0">
                  <span className="text-gray-600">Date</span>
                  <span className="text-gray-500 break-words text-right sm:text-left">
                    {new Date(txn.date).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default StageDetails;
