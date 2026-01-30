import React, { useState } from "react";
import PaymentSummary from "./PaymentSummary";

/**
 * Helper: checks if value exists (for display only)
 */
const isFilled = (v: any) =>
  v !== null &&
  v !== undefined &&
  !(typeof v === "string" && v.trim() === "");

const StageDetails = ({
  stage,
  student,
  formData,
  onChange,
  onSave,
  saving,
}: any) => {
  const [editMode, setEditMode] = useState(false);

  const isActiveStage = stage.status === "active";
  const fields = stage.fields || [];

  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-gray-800">
            {stage.stage}
          </h3>
          <span className="text-xs text-blue-600">
            {stage.status.toUpperCase()}
          </span>
        </div>

        {isActiveStage && (
          <div className="flex gap-3">
            <button
              onClick={() => setEditMode((p) => !p)}
              className="text-sm text-blue-600"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>

            {editMode && (
              <button
                onClick={onSave}
                disabled={saving}
                className="text-sm text-green-600"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ================= FIELDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field: any) => {
          const original = student[field.key];
          const edited = formData[field.key];

          /**
           * 🔑 IMPORTANT:
           * Once a user edits a field, always use formData value
           * even if it is an empty string ("")
           */
          const hasEdited = Object.prototype.hasOwnProperty.call(
            formData,
            field.key
          );

          const value = hasEdited ? edited : original;

          return (
            <div key={field._id} className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">
                {field.displayName}
              </label>

              {editMode && isActiveStage ? (
  field.fieldType === "selectBox" ? (
    <select
      className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
      value={value ?? ""}
      onChange={(e) =>
        onChange(field.key, e.target.value)
      }
    >
      <option value="">Select</option>
      {(field.options || []).map((opt: string) => (
        <option key={opt} value={opt}>
          {opt.toUpperCase()}
        </option>
      ))}
    </select>
  ) : field.fieldType === "date" ? (
    <input
      type="date"
      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      value={value ? value.slice(0, 10) : ""}
      onChange={(e) =>
        onChange(field.key, e.target.value)
      }
    />
  ) : (
    <input
      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      value={value ?? ""}
      onChange={(e) =>
        onChange(field.key, e.target.value)
      }
    />
  )
) : (
  <div className="border rounded-lg px-3 py-2 bg-gray-50 text-sm">
    {isFilled(value) ? value : "-"}
  </div>
)}

            </div>
          );
        })}
      </div>

      {/* ================= PAYMENT SUMMARY ================= */}
      {student?.transactions?.length > 0 && (
        <div className="pt-4 border-t">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Payment Summary
          </h4>

          <PaymentSummary
            student={student}
            stage={stage}
          />
        </div>
      )}
    </div>
  );
};

export default StageDetails;
