import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  X,
  Check,
  Edit,
  Trash,
  User,
  Phone,
  Mail,
  Calendar,
  Shield,
} from "lucide-react";
import { useTrip } from "@/contexts/TripContext";
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

const GroupDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { groups, createGroup, updateGroup } = useTrip();

  // Get form data from navigation state (passed from CreateGroup)
  const formState = location.state as GroupForm | undefined;

  // Check if we're editing an existing group (from Family page)
  const urlParams = new URLSearchParams(location.search);
  const groupId = urlParams.get("id");
  const isEditMode = urlParams.get("edit") === "true";

  // State for group form - initialize from navigation state or defaults
  const [groupName, setGroupName] = useState(formState?.name || "");
  const [groupDescription, setGroupDescription] = useState(
    formState?.description || ""
  );
  const [members, setMembers] = useState<GroupMemberForm[]>(
    formState?.members || []
  );

  // If navigating from Family with a group ID, load the group data
  const [loadedGroup, setLoadedGroup] = useState<Group | null>(null);

  useEffect(() => {
    if (groupId) {
      // Load group from context by ID
      const foundGroup = groups.find((g) => g.id === groupId);
      setLoadedGroup(foundGroup);

      // If we found a group, populate the form with its data
      if (foundGroup) {
        setGroupName(foundGroup.name);
        setGroupDescription(foundGroup.description);
        setMembers(foundGroup.members as GroupMemberForm[]);
      }
    }
  }, [groupId, groups]);

  // Primary user is always Priya S. as Group Owner with Full Access
  const primaryUser = {
    name: "Priya S.",
    role: "Group Owner",
    access: "Full Access",
  };

  // Editing state
  const [isEditingGroup, setIsEditingGroup] = useState(false);
  const [editingGroupName, setEditingGroupName] = useState(groupName);
  const [editingGroupDescription, setEditingGroupDescription] =
    useState(groupDescription);
  const [editingMemberIndex, setEditingMemberIndex] = useState<number | null>(
    null
  );
  const [newMember, setNewMember] = useState<GroupMemberForm>({
    name: "",
    age: "",
    relationship: "",
    phone: "",
    email: "",
    access: "View Only",
  });

  // Add member
  const addMember = () => {
    setMembers([
      ...members,
      { name: "", age: "", relationship: "", phone: "", email: "", access: "View Only" },
    ]);
  };

  // Remove member
  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  // Update member field
  const updateMemberField = (index: number, field: keyof GroupMemberForm, value: string) => {
    const updatedMembers = members.map((member, i) => {
      if (i === index) {
        return { ...member, [field]: value };
      }
      return member;
    });
    setMembers(updatedMembers);
  };

  // Open edit group state
  const handleEditGroup = () => {
    setEditingGroupName(groupName);
    setEditingGroupDescription(groupDescription);
    setIsEditingGroup(true);
  };

  // Close edit group state
  const handleCancelEdit = () => {
    setIsEditingGroup(false);
    setEditingGroupName(groupName);
    setEditingGroupDescription(groupDescription);
  };

  // Save edited group names/descriptions
  const handleSaveGroupEdit = () => {
    setGroupName(editingGroupName);
    setGroupDescription(editingGroupDescription);
    setIsEditingGroup(false);
  };

  // Save group permanently - either creates new or updates existing
    const handleSaveGroup = () => {
      // Validate
      if (!groupName.trim()) {
        toast({
          title: "Validation Error",
          description: "Group name is required",
          variant: "destructive",
        });
        return;
      }
  
      // Check for duplicate group name (only when creating new group)
      if (!isEditMode && groupId) {
        const nameExists = groups.some(
          (g) => g.name === groupName && g.id !== groupId
        );
        if (nameExists) {
          toast({
            title: "Duplicate Group",
            description: "A group with this name already exists",
            variant: "destructive",
          });
          return;
        }
      }
  
      // If in edit mode (editing an existing group from Family), update it
      if (isEditMode && groupId) {
        const updatedGroup: Group = {
          id: groupId,
          name: groupName,
          description: groupDescription,
          primaryUser: {
            name: "Priya S.",
            role: "Group Owner",
            access: "Full Access",
          },
          members: members,
          createdAt: loadedGroup?.createdAt || new Date().toISOString(),
        };
        updateGroup(groupId, updatedGroup);
        toast({
          title: "Group Updated",
          description: "Your group has been successfully updated",
        });
      } else {
        // Create new group
        const newGroup: GroupForm = {
          name: groupName,
          description: groupDescription,
          members,
        };
        createGroup(newGroup);
        toast({
          title: "Group Saved",
          description: "Your group has been successfully created",
        });
      }
  
      navigate("/family");
    };

  return (
    <div className="max-w-4xl mx-auto">
      // Header back button
      <div className="mb-6">
        <button
          onClick={() => navigate("/family")}
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <X className="w-4 h-4" /> Back to Family & Groups
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-6">
          {isEditingGroup ? "Edit Group" : "Group Details"}
        </h1>

        {/* Group Information Section */}
        {isEditingGroup ? (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Edit Group Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="editGroupName" className="block text-sm font-medium text-neutral-900 mb-2">
                  Group Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="editGroupName"
                  name="editGroupName"
                  type="text"
                  required
                  value={editingGroupName}
                  onChange={(e) => setEditingGroupName(e.target.value)}
                  className="w-full h-10 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 text-sm"
                  placeholder="e.g. Family Trip to Ooty"
                />
              </div>
              <div>
                <label htmlFor="editGroupDescription" className="block text-sm font-medium text-neutral-900 mb-2">
                  Group Description
                </label>
                <textarea
                  id="editGroupDescription"
                  name="editGroupDescription"
                  rows={3}
                  value={editingGroupDescription}
                  onChange={(e) => setEditingGroupDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 text-sm resize-none"
                  placeholder="Optional description about the group purpose"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsEditingGroup(false)}
                className="flex-1 px-4 h-10 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveGroupEdit()}
                className="flex-1 px-4 h-10 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Group Information</h2>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-6">
              <h3 className="text-xl font-medium text-neutral-900 mb-2">{groupName}</h3>
              <p className="text-neutral-600">{groupDescription || "No description added"}</p>
            </div>

            {/* Primary User Section */}
            <div className="mb-6 p-4 bg-neutral-100 rounded-lg">
              <h3 className="text-semibold text-neutral-900 mb-3">Primary User</h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-sm font-medium text-white flex-shrink-0">
                  {primaryUser.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-neutral-900 font-medium">{primaryUser.name}</p>
                  <p className="text-sm text-neutral-500">{primaryUser.role}</p>
                </div>
              </div>
              <p className="text-neutral-500 text-sm mt-1">Access: {primaryUser.access}</p>
            </div>

            {/* Group Members Section */}
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Group Members</h2>
              {members.length === 0 ? (
                <p className="text-neutral-600">No members added yet</p>
              ) : (
                <div className="space-y-4">
                  {members.map((member, index) => (
                    <div
                      key={index}
                      className={`bg-white border border-neutral-200 rounded-lg p-4 ${
                        member.access === "Edit Access"
                          ? "border-neutral-900"
                          : "border-neutral-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-sm font-medium text-white flex-shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-neutral-900 font-medium">{member.name}</p>
                          <p className="text-sm text-neutral-500">
                            {member.age} · {member.relationship}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <span className="bg-neutral-100 text-neutral-800 px-2 py-1 rounded">Phone: {member.phone}</span>
                        <span className="bg-neutral-100 text-neutral-800 px-2 py-1 rounded">Email: {member.email}</span>
                      </div>
                      <div className="mt-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            member.access === "Edit Access"
                              ? "bg-neutral-900 text-white"
                              : "bg-neutral-100 text-neutral-800"
                          }`}
                        >
                          {member.access}
                        </span>
                      </div>
                      {isEditingGroup && (
                        <div className="mt-3 pt-3 border-t border-neutral-200">
                          <button
                            onClick={() => setEditingMemberIndex(index)}
                            className="text-sm text-neutral-600 hover underline"
                          >
                            Edit Member
                          </button>
                          <button
                            onClick={() => removeMember(index)}
                            className="text-sm text-neutral-400 hover:text-neutral-600"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Member Form (always visible when not editing) */}
            {isEditingGroup ? null : (
              <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                <h3 className="text-semibold text-neutral-900 mb-3">Add Member</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      className="w-full h-10 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 text-sm"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <select
                      value={newMember.age}
                      onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                      className="w-full h-10 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 text-sm bg-white"
                    >
                      <option value="">Age</option>
                      {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
                        <option key={age} value={age.toString()}>{age}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={newMember.relationship}
                      onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value })}
                      className="w-full h-10 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 text-sm bg-white"
                    >
                      <option value="">Relationship</option>
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
                  </div>
                  <div>
                    <input
                      type="text"
                      value={newMember.phone}
                      onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                      className="w-full h-10 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 text-sm"
                      placeholder="Phone"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      className="w-full h-10 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 text-sm"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <select
                      value={newMember.access}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          access: e.target.value as "View Only" | "Edit Access",
                        })
                      }
                      className="w-full h-10 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 text-sm bg-white"
                    >
                      <option value="View Only">View Only</option>
                      <option value="Edit Access">Edit Access</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      setMembers([
                        ...members,
                        { ...newMember, name: "", age: "", relationship: "", phone: "", email: "", access: "View Only" },
                      ]);
                      setNewMember({
                        name: "",
                        age: "",
                        relationship: "",
                        phone: "",
                        email: "",
                        access: "View Only",
                      });
                    }}
                    className="px-4 h-10 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
                  >
                    Add Member
                  </button>
                </div>
              </div>
            )}

            {/* Buttons */}
            {isEditingGroup ? null : (
              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => handleEditGroup()}
                  className="flex-1 px-4 h-10 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Edit Group
                </button>
                <button
                  onClick={() => handleSaveGroup()}
                  className="flex-1 px-4 h-10 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Save Group
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;