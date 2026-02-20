import React, { useState } from "react";
import PaymentSummary from "./PaymentSummary";

/**
 * Helper: checks if value exists (for display only)
 */
const isFilled = (v: any) =>
  v !== null &&
  v !== undefined &&
  !(typeof v === "string" && v.trim() === "");

/**
 * Assigns a tab name based on field.key prefix.
 * Order matters — first match wins.
 */
const getTabForField = (key: string, displayName: string): string => {
  const k = key?.toLowerCase() || "";
  const d = displayName?.toLowerCase() || "";

  // Correspondence fields
  if (k.startsWith("correspondence")) return "Correspondence";

  // Parent / Guardian fields
  if (k.startsWith("father") || k.startsWith("mother") || k.startsWith("guardian") || k.startsWith("parent"))
    return "Parent Details";

  // Address fields
  if (["address", "city", "state", "pincode", "pinCode", "country", "district"].includes(k))
    return "Address";

  // Academic / Education fields
  if (
    k.startsWith("educationdetails") ||
    k.startsWith("educationDetails") ||
    d.startsWith("education") ||
    d.includes("graduation") ||
    d.includes("diploma") ||
    d.includes("10th") ||
    d.includes("12th") ||
    k === "percentage"
  )
    return "Academic Details";

  // Personal Details — core identity fields
  if (
    [
      "name", "studentname", "dob", "dateofbirth", "email", "phone", "mobile",
      "gender", "category", "nationality", "religion", "bloodgroup",
      "aadharno", "aadhaar", "aadhar", "castecertificateno",
    ].includes(k)
  )
    return "Personal Details";

  // Anything else
  return "Other";
};

/** Tab display order */
const TAB_ORDER = [
  "Personal Details",
  "Address",
  "Correspondence",
  "Parent Details",
  "Academic Details",
  "Other",
];

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
  const fields: any[] = stage.fields || [];

  // ── Group fields into tabs ───────────────────────
  const grouped: Record<string, any[]> = {};
  TAB_ORDER.forEach((t) => (grouped[t] = []));

  fields.forEach((f: any) => {
    const tab = getTabForField(f.key, f.displayName);
    if (!grouped[tab]) grouped[tab] = [];
    grouped[tab].push(f);
  });

  // Only show tabs that actually have fields
  const visibleTabs = TAB_ORDER.filter((t) => grouped[t]?.length > 0);

  const [activeTab, setActiveTab] = useState<string>("Personal Details");

  // If the activeTab has no fields fall back to the first visible tab
  const safeTab = grouped[activeTab]?.length > 0 ? activeTab : visibleTabs[0] || "Other";

  // ── Render a single field ────────────────────────
  const renderField = (field: any) => {
    const original = student[field.key];
    const hasEdited = Object.prototype.hasOwnProperty.call(formData, field.key);
    const value = hasEdited ? formData[field.key] : original;

    return (
      <div key={field._id} className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">{field.displayName}</label>

        {editMode && isActiveStage ? (
          field.fieldType === "selectBox" ? (
            <select
              className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={value ?? ""}
              onChange={(e) => onChange(field.key, e.target.value)}
            >
              <option value="">Select</option>
              {(field.options || []).map((opt: string) => (
                <option key={opt} value={opt}>{opt.toUpperCase()}</option>
              ))}
            </select>
          ) : field.fieldType === "date" ? (
            <input
              type="date"
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={value ? value.slice(0, 10) : ""}
              onChange={(e) => onChange(field.key, e.target.value)}
            />
          ) : (
            <input
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={value ?? ""}
              onChange={(e) => onChange(field.key, e.target.value)}
            />
          )
        ) : (
          <div className="border rounded-lg px-3 py-2 bg-gray-50 text-sm min-h-[38px]">
            {isFilled(value) ? value : "-"}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-gray-800">{stage.stage}</h3>
          <span className="text-xs text-blue-600">{stage.status.toUpperCase()}</span>
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

      {/* ================= TABS ================= */}
      {visibleTabs.length > 1 && (
        <div className="flex flex-wrap gap-1 border-b">
          {visibleTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-3 py-2 text-xs sm:text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap
                ${safeTab === tab
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* ================= FIELDS (active tab only) ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {(grouped[safeTab] || []).map(renderField)}
      </div>

      {/* ================= PAYMENT SUMMARY ================= */}
      {student?.transactions?.length > 0 && (
        <div className="pt-4 border-t">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Payment Summary</h4>
          <PaymentSummary student={student} stage={stage} />
        </div>
      )}
    </div>
  );
};

export default StageDetails;
