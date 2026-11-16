import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TripWorkflowLayout from "@/components/TripWorkflowLayout";
import { useTrip } from "@/contexts/TripContext";

const TripAccessSettings = () => {
  const navigate = useNavigate();
  const { currentTrip, updateTrip } = useTrip();

  const [canView, setCanView] = useState(
    currentTrip?.accessSettings?.canView || "selected-groups-and-invited-members"
  );
  const [canEdit, setCanEdit] = useState(
    currentTrip?.accessSettings?.canEdit || "me-and-selected-members"
  );
  const [selectedEditors, setSelectedEditors] = useState<string[]>(
    currentTrip?.accessSettings?.selectedEditors || ["Meena", "Arjun"]
  );

  const viewOptions = [
    { value: "invited-members-only", label: "Invited members only" },
    {
      value: "selected-groups-and-invited-members",
      label: "Selected groups and invited members",
    },
    { value: "anyone-with-link", label: "Anyone with an invitation link" },
  ];

  const editOptions = [
    { value: "only-me", label: "Only me (Priya)" },
    { value: "me-and-selected-members", label: "Me and selected members" },
    { value: "all-invited-members", label: "All invited members" },
  ];

  const toggleEditor = (name: string) => {
    setSelectedEditors((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleNext = () => {
    updateTrip(currentTrip!.id, {
      accessSettings: { canView, canEdit, selectedEditors },
    });
    navigate("/create-trip/5");
  };

  const handleSaveDraft = () => {
    updateTrip(currentTrip!.id, {
      accessSettings: { canView, canEdit, selectedEditors },
      status: "Draft",
    });
    navigate("/home");
  };

  const summary = (
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-xs text-neutral-500 mb-1">Trip owner</p>
        <p className="font-medium text-neutral-900">Priya</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Family members</p>
        <p className="font-medium text-neutral-900">
          {currentTrip?.familyMembers?.length || 4}
        </p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Other members</p>
        <p className="font-medium text-neutral-900">
          {currentTrip?.invitedMembers?.map((m) => m.name).join(", ") || "Meena, Arjun, Karthik"}
        </p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Visibility</p>
        <p className="font-medium text-neutral-900">
          {viewOptions.find((o) => o.value === canView)?.label}
        </p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Edit permission</p>
        <p className="font-medium text-neutral-900">
          {editOptions.find((o) => o.value === canEdit)?.label}
        </p>
      </div>
    </div>
  );

  return (
    <TripWorkflowLayout
      step={4}
      title="Trip Access Settings"
      subtitle="Control who can view and edit this trip."
      onBack={() => navigate("/create-trip/3")}
      onNext={handleNext}
      nextLabel="Next: Review & Invite"
      summary={summary}
      footerExtra={
        <button
          onClick={handleSaveDraft}
          className="px-5 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
        >
          Save as Draft
        </button>
      }
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-3">
            A. Who can view this trip?
          </h3>
          <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
            {viewOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="canView"
                  value={option.value}
                  checked={canView === option.value}
                  onChange={() => setCanView(option.value)}
                  className="w-4 h-4 accent-neutral-900"
                />
                <span className="text-sm text-neutral-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-3">
            B. Who can edit this trip?
          </h3>
          <div className="border border-neutral-200 rounded-lg p-4 space-y-3">
            {editOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="canEdit"
                  value={option.value}
                  checked={canEdit === option.value}
                  onChange={() => setCanEdit(option.value)}
                  className="w-4 h-4 accent-neutral-900"
                />
                <span className="text-sm text-neutral-700">{option.label}</span>
              </label>
            ))}
            {canEdit === "me-and-selected-members" && (
              <div className="mt-4">
                <button
                  onClick={() => {
                    const all = ["Meena", "Arjun", "Karthik"];
                    setSelectedEditors(
                      selectedEditors.length === all.length ? [] : all
                    );
                  }}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  Select Members ({selectedEditors.length})
                </button>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Meena", "Arjun", "Karthik"].map((name) => (
                    <label
                      key={name}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEditors.includes(name)}
                        onChange={() => toggleEditor(name)}
                        className="w-4 h-4 accent-neutral-900"
                      />
                      <span className="text-sm text-neutral-700">{name}</span>
                    </label>
                  ))}
                </div>
                <p className="mt-2 text-xs text-neutral-500">
                  Selected: {selectedEditors.join(", ") || "None"}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Owner Permission Rules
          </h4>
          <p className="text-sm text-neutral-700 mb-2">
            Family details and family preferences are managed exclusively by the trip owner.
          </p>
          <ul className="text-xs text-neutral-500 space-y-1 list-disc list-inside">
            <li>Priya owns all trip files and original trip details, and alone can finalise the trip.</li>
            <li>Editors cannot modify or delete Priya's family details or family preferences.</li>
            <li>Invited members cannot overwrite the organiser's proposed destination.</li>
            <li>Members can submit their own destination suggestions and preferences.</li>
          </ul>
        </div>
      </div>
    </TripWorkflowLayout>
  );
};

export default TripAccessSettings;
