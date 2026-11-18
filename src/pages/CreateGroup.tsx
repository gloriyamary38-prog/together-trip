import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus } from "lucide-react";

const CreateGroup = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([
    { name: "", age: "", relationship: "", phone: "", email: "", access: "View Only" }
  ]);

  const addMember = () => {
    setMembers([...members, { name: "", age: "", relationship: "", phone: "", email: "", access: "View Only" }]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: string, value: string) => {
    const updatedMembers = members.map((member, i) => {
      if (i === index) {
        return { ...member, [field]: value };
      }
      return member;
    });
    setMembers(updatedMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the group data
    console.log("Group created:", {
      name: (document.querySelector('input[name="groupName"]') as HTMLInputElement).value,
      description: (document.querySelector('textarea[name="groupDescription"]') as HTMLTextAreaElement).value,
      members,
    });
    navigate("/family");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Create New Group</h1>
        <p className="text-neutral-600">Set up a new travel group for your family and friends.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Group Details */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Group Details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="groupName" className="block text-sm font-medium text-neutral-900 mb-2">
                Group Name <span className="text-red-600">*</span>
              </label>
              <input
                id="groupName"
                name="groupName"
                type="text"
                required
                className="w-full h-10 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 text-sm"
                placeholder="e.g. Family Trip to Ooty"
              />
            </div>
            <div>
              <label htmlFor="groupDescription" className="block text-sm font-medium text-neutral-900 mb-2">
                Group Description
              </label>
              <textarea
                id="groupDescription"
                name="groupDescription"
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 text-sm resize-none"
                placeholder="Optional description about the group purpose"
              />
            </div>
          </div>
        </div>

        {/* Add Members */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Add Members</h2>
            <span className="text-sm text-neutral-500">Optional</span>
          </div>
          <p className="text-sm text-neutral-600 mb-4">
            Add family members or friends to this group. You can create the group without adding any members.
          </p>

          <div className="space-y-4">
            {members.map((member, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-900 mb-1">Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateMember(index, "name", e.target.value)}
                      className="w-full h-9 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 text-sm"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                                      <label className="block text-xs font-medium text-neutral-900 mb-1">Age</label>
                                      <select
                                        value={member.age}
                                        onChange={(e) => updateMember(index, "age", e.target.value)}
                                        className="w-full h-9 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 text-sm bg-white"
                                      >
                                        <option value="">Select Age</option>
                                        {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
                                          <option key={age} value={age.toString()}>{age}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <label className="block text-xs font-medium text-neutral-900 mb-1">Relationship</label>
                                      <select
                                        value={member.relationship}
                                        onChange={(e) => updateMember(index, "relationship", e.target.value)}
                                        className="w-full h-9 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 text-sm bg-white"
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
                                        <option value="Sister-in-law">Sister-in-law</option>
                                        <option value="Brother-in-law">Brother-in-law</option>
                                      </select>
                                    </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-900 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={member.phone}
                      onChange={(e) => updateMember(index, "phone", e.target.value)}
                      className="w-full h-9 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 text-sm"
                      placeholder="Phone"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-900 mb-1">Email ID</label>
                    <input
                      type="email"
                      value={member.email}
                      onChange={(e) => updateMember(index, "email", e.target.value)}
                      className="w-full h-9 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 text-sm"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-900 mb-1">Access Permission</label>
                    <select
                      value={member.access}
                      onChange={(e) => updateMember(index, "access", e.target.value)}
                      className="w-full h-9 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 text-sm bg-white"
                    >
                      <option value="View Only">View Only</option>
                      <option value="Edit Access">Edit Access</option>
                    </select>
                  </div>
                </div>
                {members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="mt-6 p-2 text-neutral-500 hover:text-neutral-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addMember}
              className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors mt-2"
            >
              <Plus className="w-4 h-4" />
              Add Another Member
            </button>
          </div>
        </div>

        {/* Group Access & Permissions */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Group Access & Permissions</h2>
          <div className="mt-4 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
            <p className="text-xs text-neutral-600">
              <span className="font-medium text-neutral-900">Note:</span> The group creator automatically has owner privileges and full access. Individual member access permissions are set per member above.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/family")}
            className="px-4 h-10 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Back to Groups
          </button>
          <button
            type="button"
            onClick={() => navigate("/family")}
            className="px-4 h-10 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 h-10 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Create Group
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
