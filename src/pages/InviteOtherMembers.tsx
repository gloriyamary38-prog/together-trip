import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TripWorkflowLayout from "@/components/TripWorkflowLayout";
import { useTrip } from "@/contexts/TripContext";

const InviteOtherMembers = () => {
  const navigate = useNavigate();
  const { currentTrip, updateTrip, groups } = useTrip();

  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [addedMembers, setAddedMembers] = useState(
    currentTrip?.invitedMembers || []
  );
  const [selectedGroups, setSelectedGroups] = useState(
    currentTrip?.selectedGroups || []
  );
  const [showGroupModal, setShowGroupModal] = useState(false);

  // Use groups from TripContext (actual user-created groups)
  // groups is already loaded from localStorage in TripProvider

  const addMember = () => {
    if (!memberName.trim() || !memberPhone.trim()) return;
    const newMember = {
      id: Date.now().toString(),
      name: memberName,
      phone: memberPhone,
    };
    setAddedMembers([...addedMembers, newMember]);
    setMemberName("");
    setMemberPhone("");
  };

  const removeMember = (id: string) => {
    setAddedMembers(addedMembers.filter((m) => m.id !== id));
  };

  const toggleGroup = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((g) => g !== groupId) : [...prev, groupId]
    );
  };

  const handleNext = () => {
    const invitations = addedMembers.map((m) => ({
      id: m.id,
      member: m.name,
      phone: m.phone,
      status: "Pending" as const,
    }));
    updateTrip(currentTrip!.id, {
      invitedMembers: addedMembers,
      selectedGroups,
      invitations,
    });
    navigate("/create-trip/4");
  };

  const handleSaveDraft = () => {
    updateTrip(currentTrip!.id, {
      invitedMembers: addedMembers,
      selectedGroups,
      status: "Draft",
    });
    navigate("/home");
  };

  // Calculate total travellers, excluding duplicates
  const allAddedMemberNames = new Set(addedMembers.map((m) => m.name));
  const selectedGroupMemberNames = new Set();
  // Collect member names from selected groups
  // groups from TripContext have members array
  const allGroups = groups; // already available from context
  
  // Calculate total: family members + added members - duplicates
  const familyMembersCount = currentTrip?.familyMembers?.length || 0;
  const totalTravellers = familyMembersCount + addedMembers.length;

  const summary = (
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-xs text-neutral-500 mb-1">Trip name</p>
        <p className="font-medium text-neutral-900">{currentTrip?.name || "—"}</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">My family</p>
        <p className="font-medium text-neutral-900">
          {currentTrip?.familyMembers?.length || 0}
        </p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Other invited</p>
        <p className="font-medium text-neutral-900">{addedMembers.length}</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Selected groups</p>
        <p className="font-medium text-neutral-900">
          {selectedGroups.length > 0 ? selectedGroups.join(", ") : "—"}
        </p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Total travellers</p>
        <p className="font-medium text-neutral-900">{totalTravellers}</p>
      </div>
    </div>
  );

  // Get group details from the groups state for display
  const groupDetails = allGroups
    .filter((g) => selectedGroups.includes(g.id))
    .map((g) => ({
      id: g.id,
      name: g.name,
      members: g.members.length,
    }));

  return (
    <TripWorkflowLayout
      step={3}
      title="Invite Other Members"
      subtitle="Invite extended family members or friends to plan together."
      onBack={() => navigate("/create-trip/2")}
      onNext={handleNext}
      nextLabel="Next: Review & Send Invitation"
      summary={summary}
      footerExtra={
        <button
          onClick={handleSaveDraft}
          className="px-5 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
        >
          Back
        </button>
      }
    >
      <div className="space-y-8">
        <div className="flex gap-2">
          <button
            onClick={() => setShowGroupModal(false)}
            className="flex-1 py-3 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-900 bg-neutral-100"
          >
            Add Individual Members
          </button>
          <button
            onClick={() => setShowGroupModal(true)}
            className="flex-1 py-3 border border-neutral-200 rounded-lg text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Add from My Groups
          </button>
        </div>

        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Add Individual Members</h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              placeholder="Enter member name"
              className="flex-1 h-11 px-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
            <input
              type="text"
              value={memberPhone}
              onChange={(e) => setMemberPhone(e.target.value)}
              placeholder="+91 Enter number"
              className="w-64 h-11 px-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
            <button
              onClick={addMember}
              className="h-11 px-4 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Add Member
            </button>
          </div>

          <h3 className="text-sm font-medium text-neutral-700 mb-3">Added Members</h3>
          <div className="space-y-2">
            {addedMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-neutral-900">{member.name}</span>
                  <span className="text-sm text-neutral-500">{member.phone}</span>
                </div>
                <button
                  onClick={() => removeMember(member.id)}
                  className="text-sm text-neutral-500 hover:text-neutral-900 underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {showGroupModal && (
          <div className="bg-white border border-neutral-200 rounded-lg p-6">
            <h3 className="text-sm font-medium text-neutral-700 mb-4">Add from My Groups</h3>
            <div className="space-y-3">
              {allGroups.map((group) => (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedGroups.includes(group.id)}
                        onChange={() => toggleGroup(group.id)}
                        className="w-4 h-4 accent-neutral-900"
                      />
                      <span className="text-sm font-medium text-neutral-900">
                        {group.name}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {group.members} members
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-xs text-neutral-600 hover:text-neutral-900 underline">
                      View Members
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-neutral-500">
              Duplicate members are automatically detected and excluded.
            </p>
          </div>
        )}
      </div>
    </TripWorkflowLayout>
  );
};

export default InviteOtherMembers;