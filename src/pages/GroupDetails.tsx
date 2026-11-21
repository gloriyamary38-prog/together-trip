
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { X, Plus, Trash2 } from "lucide-react";
import { useTrip, type Group } from "@/contexts/TripContext";
import { toast } from "@/components/ui/use-toast";

interface GroupMemberForm {
  name: string;
  age: string;
  relationship: string;
  phone: string;
  email: string;
  access: "View Only" | "Edit Access";
}

interface GroupForm {
  name: string;
  description: string;
  members: GroupMemberForm[];
}

const emptyMember: GroupMemberForm = {
  name: "",
  age: "",
  relationship: "",
  phone: "",
  email: "",
  access: "View Only",
};

const GroupDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Read group ID from the URL path
  const { groupId: routeGroupId } = useParams<{ groupId: string }>();

  const {
    groups,
    createGroup,
    updateGroup,
  } = useTrip();

  const urlParams = new URLSearchParams(location.search);
  const groupId = routeGroupId || urlParams.get("id");
  const isEditMode = urlParams.get("edit") === "true";

  const formState = location.state as GroupForm | undefined;

  const loadedGroup = groups.find((group) => group.id === groupId);

  const [groupName, setGroupName] = useState(
    loadedGroup?.name || formState?.name || ""
  );

  const [groupDescription, setGroupDescription] = useState(
    loadedGroup?.description || formState?.description || ""
  );

  const [members, setMembers] = useState<GroupMemberForm[]>(
    (loadedGroup?.members || formState?.members || []) as GroupMemberForm[]
  );

  const [editingGroupName, setEditingGroupName] = useState(
    loadedGroup?.name || formState?.name || ""
  );

  const [editingGroupDescription, setEditingGroupDescription] = useState(
    loadedGroup?.description || formState?.description || ""
  );

  const [isEditingGroup, setIsEditingGroup] = useState(isEditMode);

  const [newMember, setNewMember] = useState<GroupMemberForm>({
    ...emptyMember,
  });

  // Load the selected group's saved information
  useEffect(() => {
    if (loadedGroup) {
      setGroupName(loadedGroup.name);
      setGroupDescription(loadedGroup.description);
      setMembers(loadedGroup.members as GroupMemberForm[]);
      setEditingGroupName(loadedGroup.name);
      setEditingGroupDescription(loadedGroup.description);
    }
  }, [loadedGroup]);

  // Primary user
  const primaryUser = loadedGroup?.primaryUser || {
    name: "Priya S.",
    role: "Group Owner",
    access: "Full Access",
  };

  // Add a member
  const handleAddMember = () => {
    if (!newMember.name.trim()) {
      toast({
        title: "Member name required",
        description: "Please enter the member's name.",
        variant: "destructive",
      });
      return;
    }

    setMembers((previous) => [...previous, { ...newMember }]);
    setNewMember({ ...emptyMember });

    toast({
      title: "Member Added",
      description: "The member has been added to the group.",
    });
  };

  // Remove a member
  const handleRemoveMember = (index: number) => {
    setMembers((previous) => previous.filter((_, i) => i !== index));
  };

  // Save group information
  const handleSaveGroup = () => {
    if (!groupName.trim()) {
      toast({
        title: "Validation Error",
        description: "Group name is required.",
        variant: "destructive",
      });
      return;
    }

    if (groupId && loadedGroup) {
      // Update the existing group
      const updatedGroup: Group = {
        ...loadedGroup,
        name: groupName.trim(),
        description: groupDescription,
        members,
      };

      updateGroup(groupId, updatedGroup);

      toast({
        title: "Group Updated",
        description: "Your group has been successfully updated.",
      });
    } else {
      // Create a new group
      createGroup({
        name: groupName.trim(),
        description: groupDescription,
        primaryUser: primaryUser,
        members,
      });

      toast({
        title: "Group Created",
        description: "Your new group has been successfully created.",
      });
    }

    navigate("/family");
  };

  // Save name and description edits
  const handleSaveBasicDetails = () => {
    if (!editingGroupName.trim()) {
      toast({
        title: "Validation Error",
        description: "Group name is required.",
        variant: "destructive",
      });
      return;
    }

    setGroupName(editingGroupName.trim());
    setGroupDescription(editingGroupDescription);

    if (groupId && loadedGroup) {
      updateGroup(groupId, {
        name: editingGroupName.trim(),
        description: editingGroupDescription,
      });
    }

    setIsEditingGroup(false);

    toast({
      title: "Changes Saved",
      description: "Group information has been updated.",
    });
  };

  const handleCancelEdit = () => {
    setEditingGroupName(groupName);
    setEditingGroupDescription(groupDescription);
    setIsEditingGroup(false);
  };

  return (
    <div className="max-w-4xl mx-auto">

      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/family")}
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
        >
          <X className="w-4 h-4" />
          Back to Family & Groups
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-8">

        <h1 className="text-3xl font-bold text-neutral-900 mb-6">
          {isEditingGroup ? "Edit Group" : "Group Details"}
        </h1>

        {/* Group Information */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            Group Information
          </h2>

          {isEditingGroup ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  value={editingGroupName}
                  onChange={(e) => setEditingGroupName(e.target.value)}
                  className="w-full h-10 px-3 border border-neutral-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Group Description
                </label>
                <textarea
                  rows={3}
                  value={editingGroupDescription}
                  onChange={(e) =>
                    setEditingGroupDescription(e.target.value)
                  }
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 h-10 border border-neutral-300 rounded-lg text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveBasicDetails}
                  className="flex-1 h-10 bg-neutral-900 text-white rounded-lg text-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <h3 className="text-xl font-medium mb-2">
                {groupName || "New Group"}
              </h3>

              <p className="text-neutral-600">
                {groupDescription || "No description added"}
              </p>
            </div>
          )}
        </div>

        {/* Primary User */}
        <div className="mb-8 p-4 bg-neutral-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">
            Primary User
          </h2>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-white font-medium">
              {primaryUser.name.charAt(0)}
            </div>

            <div>
              <p className="font-medium text-neutral-900">
                {primaryUser.name}
              </p>
              <p className="text-sm text-neutral-500">
                {primaryUser.role}
              </p>
            </div>
          </div>

          <p className="text-sm text-neutral-500 mt-3">
            Access: {primaryUser.access}
          </p>
        </div>

        {/* Group Members */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Group Members ({members.length})
          </h2>

          {members.length === 0 ? (
            <p className="text-neutral-600">
              No members added yet.
            </p>
          ) : (
            <div className="space-y-4">
              {members.map((member, index) => (
                <div
                  key={`${member.name}-${index}`}
                  className="bg-white border border-neutral-200 rounded-lg p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-white font-medium">
                      {member.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">
                        {member.name}
                      </p>

                      <p className="text-sm text-neutral-500">
                        {member.age} · {member.relationship}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <p className="bg-neutral-100 px-3 py-2 rounded">
                      Phone: {member.phone || "Not provided"}
                    </p>

                    <p className="bg-neutral-100 px-3 py-2 rounded">
                      Email: {member.email || "Not provided"}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded text-xs ${
                        member.access === "Edit Access"
                          ? "bg-neutral-900 text-white"
                          : "bg-neutral-100 text-neutral-800"
                      }`}
                    >
                      {member.access}
                    </span>

                    {isEditingGroup && (
                      <button
                        onClick={() => handleRemoveMember(index)}
                        className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Member */}
        {isEditingGroup && (
          <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">
              Add Member
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Name"
                value={newMember.name}
                onChange={(e) =>
                  setNewMember({ ...newMember, name: e.target.value })
                }
                className="h-10 px-3 border border-neutral-300 rounded-lg text-sm"
              />

              <input
                type="number"
                placeholder="Age"
                value={newMember.age}
                onChange={(e) =>
                  setNewMember({ ...newMember, age: e.target.value })
                }
                className="h-10 px-3 border border-neutral-300 rounded-lg text-sm"
              />

              <select
                value={newMember.relationship}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    relationship: e.target.value,
                  })
                }
                className="h-10 px-3 border border-neutral-300 rounded-lg text-sm bg-white"
              >
                <option value="">Select Relationship</option>
                <option value="Husband">Husband</option>
                <option value="Wife">Wife</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Brother">Brother</option>
                <option value="Sister">Sister</option>
                <option value="Aunt">Aunt</option>
                <option value="Uncle">Uncle</option>
                <option value="Cousin">Cousin</option>
                <option value="Friend">Friend</option>
              </select>

              <input
                type="tel"
                placeholder="Phone"
                value={newMember.phone}
                onChange={(e) =>
                  setNewMember({ ...newMember, phone: e.target.value })
                }
                className="h-10 px-3 border border-neutral-300 rounded-lg text-sm"
              />

              <input
                type="email"
                placeholder="Email"
                value={newMember.email}
                onChange={(e) =>
                  setNewMember({ ...newMember, email: e.target.value })
                }
                className="h-10 px-3 border border-neutral-300 rounded-lg text-sm"
              />

              <select
                value={newMember.access}
                onChange={(e) =>
                  setNewMember({
                    ...newMember,
                    access: e.target.value as "View Only" | "Edit Access",
                  })
                }
                className="h-10 px-3 border border-neutral-300 rounded-lg text-sm bg-white"
              >
                <option value="View Only">View Only</option>
                <option value="Edit Access">Edit Access</option>
              </select>
            </div>

            <button
              onClick={handleAddMember}
              className="mt-4 inline-flex items-center gap-2 px-4 h-10 bg-neutral-900 text-white rounded-lg text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </button>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-8 flex gap-3">
          {!isEditingGroup && groupId && (
            <button
              onClick={() => setIsEditingGroup(true)}
              className="flex-1 h-10 border border-neutral-300 rounded-lg text-sm font-medium"
            >
              Edit Group
            </button>
          )}

          {(isEditingGroup || !groupId) && (
            <button
              onClick={handleSaveGroup}
              className="flex-1 h-10 bg-neutral-900 text-white rounded-lg text-sm font-medium"
            >
              {groupId ? "Save Group" : "Create Group"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
