import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Edit2 } from "lucide-react";
import TripWorkflowLayout from "@/components/TripWorkflowLayout";
import { useTrip } from "@/contexts/TripContext";

const MyFamilyPreferences = () => {
  const navigate = useNavigate();
  const { currentTrip, updateTrip } = useTrip();

  const [familyMembers, setFamilyMembers] = useState(
    currentTrip?.familyMembers || [
      { id: "1", name: "Priya", age: 38, role: "Trip Owner" },
    ]
  );
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");

  const preferences = [
    "Family Time",
    "Adventure",
    "Relaxation",
    "Nature",
    "Heritage & Culture",
    "Food & Local Experiences",
    "Children's Activities",
    "Other Interests",
  ];
  const [selectedPreferences, setSelectedPreferences] = useState(
    currentTrip?.preferences || ["Family Time", "Nature", "Children's Activities"]
  );

  const [expectations, setExpectations] = useState(
    currentTrip?.purpose || "Relaxed time together, nature walks and activities for the children."
  );

  const addMember = () => {
    if (!newName.trim() || !newAge.trim()) return;
    const newMember = {
      id: Date.now().toString(),
      name: newName,
      age: parseInt(newAge, 10),
      role: "Family Member" as const,
    };
    setFamilyMembers([...familyMembers, newMember]);
    setNewName("");
    setNewAge("");
  };

  const removeMember = (id: string) => {
    setFamilyMembers(familyMembers.filter((m) => m.id !== id));
  };

  const startEdit = (member: typeof familyMembers[0]) => {
    setEditingId(member.id);
    setEditName(member.name);
    setEditAge(member.age.toString());
  };

  const saveEdit = () => {
    if (!editName.trim() || !editAge.trim()) return;
    setFamilyMembers(
      familyMembers.map((m) =>
        m.id === editingId
          ? { ...m, name: editName, age: parseInt(editAge, 10) }
          : m
      )
    );
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const togglePreference = (pref: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleNext = () => {
    updateTrip(currentTrip!.id, {
      familyMembers,
      preferences: selectedPreferences,
      purpose: expectations,
    });
    navigate("/create-trip/3");
  };

  const handleSaveDraft = () => {
    updateTrip(currentTrip!.id, {
      familyMembers,
      preferences: selectedPreferences,
      purpose: expectations,
      status: "Draft",
    });
    navigate("/home");
  };

  const summary = (
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-xs text-neutral-500 mb-1">Trip name</p>
        <p className="font-medium text-neutral-900">{currentTrip?.name || "—"}</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Family members</p>
        <p className="font-medium text-neutral-900">{familyMembers.length}</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Preferences</p>
        <p className="font-medium text-neutral-900">
          {selectedPreferences.length > 0 ? selectedPreferences.join(", ") : "—"}
        </p>
      </div>
    </div>
  );

  return (
    <TripWorkflowLayout
      step={2}
      title="My Family"
      subtitle="Manage your family members and define their expectations for this trip."
      onBack={() => navigate("/create-trip/1")}
      onNext={handleNext}
      nextLabel="Next: Members & Groups"
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
          <p className="text-sm text-neutral-600 mb-4">
            Priya is the family owner and manages the family profile.
          </p>
          <div className="space-y-2">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="border border-neutral-200 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {editingId === member.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-9 px-3 border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                      <input
                        type="number"
                        value={editAge}
                        onChange={(e) => setEditAge(e.target.value)}
                        className="w-16 h-9 px-3 border border-neutral-300 rounded text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                      <button
                        onClick={saveEdit}
                        className="px-3 h-9 bg-neutral-900 text-white text-xs font-medium rounded hover:bg-neutral-800 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="ml-2 px-3 h-9 border border-neutral-300 rounded text-xs text-neutral-600 hover:bg-neutral-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="font-medium text-neutral-900">{member.name}</span>
                      <span className="text-xs text-neutral-500">Age {member.age}</span>
                      <span className="text-xs text-neutral-500">{member.role}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {editingId !== member.id && (
                    <>
                      <button
                        onClick={() => startEdit(member)}
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeMember(member.id)}
                        className="p-1.5 text-neutral-400 hover:text-neutral-900 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter name"
              className="flex-1 h-10 px-3 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
            <input
              type="number"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
              placeholder="Age"
              className="w-20 h-10 px-3 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
            <button
              onClick={addMember}
              className="flex items-center gap-1 px-4 h-10 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Family Member
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">Family Trip Preferences</h2>
          <p className="text-sm text-neutral-500 mb-4">
            Priya alone can create and edit her family's preferences.
          </p>
          <div className="flex flex-wrap gap-2">
            {preferences.map((pref) => (
              <button
                key={pref}
                onClick={() => togglePreference(pref)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  selectedPreferences.includes(pref)
                    ? "bg-neutral-900 border-neutral-900 text-white"
                    : "bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            What does your family expect from this trip?
          </label>
          <textarea
            value={expectations}
            onChange={(e) => setExpectations(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-none"
          />
        </div>
      </div>
    </TripWorkflowLayout>
  );
};

export default MyFamilyPreferences;
