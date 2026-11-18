
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserPlus, Trash2, Shield } from "lucide-react";
import TripWorkflowLayout from "@/components/TripWorkflowLayout";
import { useTrip } from "@/contexts/TripContext";

type InviteMember = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  source: "individual" | "group";
  groupId?: string;
  groupName?: string;
  access: string;
};

const getMemberName = (member: any) =>
  member?.name ||
  member?.fullName ||
  member?.memberName ||
  "Unnamed member";

const getMemberAccess = (member: any) => {
  const value = String(
    member?.access ??
      member?.permission ??
      member?.accessLevel ??
      "View Only"
  ).toLowerCase();

  return value.includes("edit") ? "Edit Access" : "View Only";
};

const InviteOtherMembers = () => {
  const navigate = useNavigate();

  const tripContext = useTrip() as any;
  const currentTrip = tripContext.currentTrip;
  const updateTrip = tripContext.updateTrip;
  const groups = Array.isArray(tripContext.groups)
    ? tripContext.groups
    : [];

  const [activeTab, setActiveTab] = useState<"individual" | "groups">(
    "individual"
  );

  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<string[]>(
    []
  );

  const [showGroupMembers, setShowGroupMembers] = useState(false);
  const [error, setError] = useState("");

  const [addedMembers, setAddedMembers] = useState<InviteMember[]>(
    currentTrip?.invitedMembers || []
  );

  const selectedGroup = groups.find(
    (group: any) => String(group.id) === selectedGroupId
  );

  const groupMembers = useMemo(() => {
    if (!selectedGroup) return [];

    return Array.isArray(selectedGroup.members)
      ? selectedGroup.members
      : [];
  }, [selectedGroup]);

  useEffect(() => {
    setAddedMembers(currentTrip?.invitedMembers || []);
  }, [currentTrip?.id, currentTrip?.invitedMembers]);

  const getMemberKey = (member: any) => {
    const phone = String(
      member?.phone || member?.phoneNumber || ""
    ).replace(/\D/g, "");

    const email = String(
      member?.email || member?.emailId || ""
    )
      .trim()
      .toLowerCase();

    if (phone) return `phone:${phone}`;
    if (email) return `email:${email}`;

    return `name:${getMemberName(member).trim().toLowerCase()}`;
  };

  const isAlreadyAdded = (member: any) => {
    const key = getMemberKey(member);

    return addedMembers.some(
      (item) => getMemberKey(item) === key
    );
  };

  const addIndividualMember = () => {
    setError("");

    if (!memberName.trim()) {
      setError("Please enter the member's name.");
      return;
    }

    if (!memberPhone.trim() && !memberEmail.trim()) {
      setError("Please enter a phone number or email address.");
      return;
    }

    const newMember: InviteMember = {
      id: `individual-${Date.now()}`,
      name: memberName.trim(),
      phone: memberPhone.trim(),
      email: memberEmail.trim(),
      source: "individual",
      access: "Edit Access",
    };

    if (isAlreadyAdded(newMember)) {
      setError("This member has already been added.");
      return;
    }

    setAddedMembers((previous) => [...previous, newMember]);

    setMemberName("");
    setMemberPhone("");
    setMemberEmail("");
  };

  const toggleGroupMember = (member: any) => {
    const memberId = String(
      member.id ?? getMemberKey(member)
    );

    setSelectedGroupMembers((previous) =>
      previous.includes(memberId)
        ? previous.filter((id) => id !== memberId)
        : [...previous, memberId]
    );
  };

  const selectAllGroupMembers = () => {
    const allIds = groupMembers.map((member: any) =>
      String(member.id ?? getMemberKey(member))
    );

    const allSelected = allIds.every((id: string) =>
      selectedGroupMembers.includes(id)
    );

    setSelectedGroupMembers(allSelected ? [] : allIds);
  };

  const addSelectedGroupMembers = () => {
    if (!selectedGroup) {
      setError("Please select a group.");
      return;
    }

    const membersToAdd: InviteMember[] = groupMembers
      .filter((member: any) =>
        selectedGroupMembers.includes(
          String(member.id ?? getMemberKey(member))
        )
      )
      .filter((member: any) => !isAlreadyAdded(member))
      .map((member: any) => ({
        id: `group-${selectedGroup.id}-${member.id ?? getMemberKey(member)}`,
        name: getMemberName(member),
        phone: member.phone || member.phoneNumber || "",
        email: member.email || member.emailId || "",
        source: "group" as const,
        groupId: String(selectedGroup.id),
        groupName:
          selectedGroup.name ||
          selectedGroup.groupName ||
          "Group",
        access: getMemberAccess(member),
      }));

    if (membersToAdd.length === 0) {
      setError(
        "No new members selected. They may already be invited."
      );
      return;
    }

    setAddedMembers((previous) => [
      ...previous,
      ...membersToAdd,
    ]);

    setSelectedGroupMembers([]);
    setShowGroupMembers(false);
    setError("");
  };

  const removeMember = (id: string) => {
    setAddedMembers((previous) =>
      previous.filter((member) => member.id !== id)
    );
  };

  const handleNext = () => {
    setError("");

    if (!currentTrip?.id) {
      setError(
        "Please create and save the trip before inviting members."
      );
      return;
    }

    if (typeof updateTrip !== "function") {
      setError("Unable to save invitations. Please check TripContext.");
      return;
    }

    const invitations = addedMembers.map((member) => ({
      id: member.id,
      member: member.name,
      phone: member.phone || "",
      email: member.email || "",
      source: member.source,
      groupId: member.groupId,
      groupName: member.groupName,
      access: member.access,
      status: "Pending" as const,
    }));

    updateTrip(currentTrip.id, {
      invitedMembers: addedMembers,
      selectedGroups: [
        ...new Set(
          addedMembers
            .filter((member) => member.groupId)
            .map((member) => member.groupId)
        ),
      ],
      invitations,
    });

    navigate("/create-trip/4");
  };

  const tripSummary = (
    <div className="space-y-3 text-sm">
      <h3 className="font-semibold text-neutral-900">
        Trip Summary
      </h3>

      <div>
        <p className="text-neutral-500">Trip Name</p>
        <p className="font-medium">
          {currentTrip?.name || "—"}
        </p>
      </div>

      <div>
        <p className="text-neutral-500">Destinations</p>
        <p className="font-medium">
          {(
            currentTrip?.proposedDestinations ||
            currentTrip?.destinations ||
            []
          ).join?.(", ") ||
            currentTrip?.destination ||
            "—"}
        </p>
      </div>

      <div>
        <p className="text-neutral-500">Other Members</p>
        <p className="font-medium">
          {addedMembers.length} members
        </p>
      </div>

      <div>
        <p className="text-neutral-500">Selected Groups</p>
        <p className="font-medium">
          {[
            ...new Set(
              addedMembers
                .map((member) => member.groupName)
                .filter(Boolean)
            ),
          ].join(", ") || "—"}
        </p>
      </div>
    </div>
  );

  return (
    <TripWorkflowLayout
      step={3}
      title="Invite Other Members"
      subtitle="Add extended family or friends to plan together."
      onBack={() => navigate("/create-trip/2")}
      onNext={handleNext}
      nextLabel="Next: Review & Send Invitation"
      summary={tripSummary}
    >
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-3 border-b border-neutral-200">
          <button
            type="button"
            onClick={() => {
              setActiveTab("individual");
              setError("");
            }}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "individual"
                ? "border-b-2 border-neutral-900 text-neutral-900"
                : "text-neutral-500"
            }`}
          >
            <UserPlus className="mr-2 inline h-4 w-4" />
            Add Individual Members
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("groups");
              setError("");
            }}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "groups"
                ? "border-b-2 border-neutral-900 text-neutral-900"
                : "text-neutral-500"
            }`}
          >
            <Users className="mr-2 inline h-4 w-4" />
            Add from My Groups
          </button>
        </div>

        {/* Individual Members */}
        {activeTab === "individual" && (
          <section className="rounded-xl border border-neutral-200 p-5">
            <h3 className="mb-1 font-semibold text-neutral-900">
              Add Individual Member
            </h3>

            <p className="mb-4 text-sm text-neutral-500">
              Enter the details of the person you want to invite.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Name
                </label>

                <input
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="Enter member name"
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  WhatsApp Number
                </label>

                <input
                  value={memberPhone}
                  onChange={(e) => setMemberPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Email ID (Optional)
                </label>

                <input
                  type="email"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={addIndividualMember}
              className="mt-4 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700"
            >
              <UserPlus className="mr-2 inline h-4 w-4" />
              Add Member
            </button>
          </section>
        )}

        {/* Saved Groups */}
        {activeTab === "groups" && (
          <section className="rounded-xl border border-neutral-200 p-5">
            <h3 className="mb-1 font-semibold text-neutral-900">
              Add Members from My Groups
            </h3>

            <p className="mb-4 text-sm text-neutral-500">
              Select a saved group and choose the members you want to invite.
            </p>

            {groups.length === 0 ? (
              <div className="rounded-lg bg-neutral-50 p-5 text-center">
                <Users className="mx-auto mb-2 h-8 w-8 text-neutral-400" />

                <p className="font-medium text-neutral-700">
                  No saved groups yet
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  Create a group in Family & Groups before inviting its members.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/family/create-group")}
                  className="mt-3 text-sm font-semibold underline"
                >
                  Create a Group
                </button>
              </div>
            ) : (
              <>
                <label className="mb-2 block text-sm font-medium">
                  Select a Group
                </label>

                <select
                  value={selectedGroupId}
                  onChange={(e) => {
                    setSelectedGroupId(e.target.value);
                    setSelectedGroupMembers([]);
                    setShowGroupMembers(false);
                    setError("");
                  }}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5"
                >
                  <option value="">
                    Choose a saved group
                  </option>

                  {groups.map((group: any) => (
                    <option key={group.id} value={group.id}>
                      {group.name || group.groupName || "Unnamed Group"} (
                      {group.members?.length || 0} members)
                    </option>
                  ))}
                </select>

                {selectedGroup && (
                  <div className="mt-4 rounded-lg border border-neutral-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="font-semibold">
                          {selectedGroup.name ||
                            selectedGroup.groupName}
                        </h4>

                        <p className="text-sm text-neutral-500">
                          {groupMembers.length} members
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setShowGroupMembers((value) => !value)
                        }
                        className="text-sm font-medium underline"
                      >
                        {showGroupMembers
                          ? "Hide Members"
                          : "View Members"}
                      </button>
                    </div>

                    {showGroupMembers && (
                      <div className="mt-4 border-t border-neutral-200 pt-4">
                        <label className="mb-3 flex items-center gap-2 text-sm font-medium">
                          <input
                            type="checkbox"
                            checked={
                              groupMembers.length > 0 &&
                              groupMembers.every((member: any) =>
                                selectedGroupMembers.includes(
                                  String(
                                    member.id ?? getMemberKey(member)
                                  )
                                )
                              )
                            }
                            onChange={selectAllGroupMembers}
                          />
                          Select All Members
                        </label>

                        <div className="space-y-3">
                          {groupMembers.map(
                            (member: any, index: number) => {
                              const id = String(
                                member.id ?? getMemberKey(member)
                              );

                              const alreadyAdded =
                                isAlreadyAdded(member);

                              return (
                                <label
                                  key={id || index}
                                  className="flex items-center justify-between gap-3 rounded-lg bg-neutral-50 p-3"
                                >
                                  <span className="flex items-center gap-3">
                                    <input
                                      type="checkbox"
                                      checked={selectedGroupMembers.includes(id)}
                                      disabled={alreadyAdded}
                                      onChange={() =>
                                        toggleGroupMember(member)
                                      }
                                    />

                                    <span>
                                      <span className="block text-sm font-medium">
                                        {getMemberName(member)}
                                      </span>

                                      <span className="text-xs text-neutral-500">
                                        {member.phone ||
                                          member.phoneNumber ||
                                          member.email ||
                                          member.emailId ||
                                          ""}
                                        {alreadyAdded
                                          ? " · Already added"
                                          : ""}
                                      </span>
                                    </span>
                                  </span>

                                  <span className="whitespace-nowrap text-xs text-neutral-600">
                                    {getMemberAccess(member)}
                                  </span>
                                </label>
                              );
                            }
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={addSelectedGroupMembers}
                          disabled={selectedGroupMembers.length === 0}
                          className="mt-4 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Add Selected Members
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* Error Message */}
        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {/* Invited Members */}
        <section className="rounded-xl border border-neutral-200 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-neutral-900">
                Invited Members ({addedMembers.length})
              </h3>

              <p className="text-sm text-neutral-500">
                Review the people and their inherited group permissions.
              </p>
            </div>
          </div>

          {addedMembers.length === 0 ? (
            <p className="rounded-lg bg-neutral-50 p-5 text-center text-sm text-neutral-500">
              No members added yet.
            </p>
          ) : (
            <div className="space-y-3">
              {addedMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-neutral-200 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100">
                      <Users className="h-4 w-4 text-neutral-600" />
                    </div>

                    <div>
                      <p className="font-medium text-neutral-900">
                        {member.name}
                      </p>

                      <p className="text-xs text-neutral-500">
                        {member.phone ||
                          member.email ||
                          "Contact not provided"}
                        {member.groupName
                          ? ` · ${member.groupName}`
                          : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-600">
                      {member.access}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      aria-label={`Remove ${member.name}`}
                      className="rounded-md p-2 text-neutral-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Permission Information */}
        <div className="flex items-start gap-2 text-xs text-neutral-500">
          <Shield className="mt-0.5 h-4 w-4 shrink-0" />

          <p>
            Group members retain the View Only or Edit Access permission
            saved in Family & Groups. These permissions are not changed here.
          </p>
        </div>
      </div>
    </TripWorkflowLayout>
  );
};

export default InviteOtherMembers;
