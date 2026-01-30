import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Timeline from "../../components/timeline/Timeline";
import { saveAdmissionApplication } from "../../services/admissionService";

const ApplicationDetails = ({ application, stages }: any) => {
  const { applicationId } = useParams();

  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        ...application,
        ...formData,
      };

      await saveAdmissionApplication(payload);

      setFormData({});
      alert("Application updated successfully");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Application Details
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Application ID: {applicationId}
      </p>

      <Timeline
        stages={stages}
        student={application}
        formData={formData}
        onChange={handleFieldChange}
        onSave={handleSave}
      />

      {saving && (
        <p className="text-sm text-gray-500 mt-4">
          Saving…
        </p>
      )}
    </div>
  );
};

export default ApplicationDetails;
