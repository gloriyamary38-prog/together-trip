
import { Users, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "@/contexts/TripContext";
import { toast } from "@/components/ui/use-toast";

const Family = () => {
  const navigate = useNavigate();
  const { groups, deleteGroup } = useTrip();

  const handleCreateGroup = () => {
    navigate("/family/create-group");
  };

  const handleViewGroup = (groupId: string) => {
    navigate(`/family/group-details/${groupId}`);
  };

  const handleEditGroup = (groupId: string) => {
    navigate(`/family/group-details/${groupId}?edit=true`);
  };

  const handleDeleteGroup = (groupId: string, groupName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${groupName}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    deleteGroup(groupId);

    toast({
      title: "Group Deleted",
      description: `${groupName} has been successfully deleted.`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Family & Groups
        </h1>
        <p className="text-neutral-600">
          Create and manage your travel groups.
        </p>
      </div>

      <div className="mb-6">
        <button
          onClick={handleCreateGroup}
          className="inline-flex items-center gap-2 px-6 h-10 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Group
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.length === 0 && (
          <div className="col-span-1">
            <div className="bg-white border border-neutral-200 rounded-lg p-12">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-neutral-400" />
              </div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                No groups created yet
              </h2>
              <p className="text-neutral-600 mb-6 max-w-md">
                Create your first group to bring family and friends together for travel planning.
              </p>
            </div>
          </div>
        )}

        {groups.map((group) => (
          <div
            key={group.id}
            className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg hover:transition-shadow transform hover:-translate-y-1"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 line-clamp-2">
                {group.name}
              </h3>

              <p className="text-neutral-500 line-clamp-2 mb-4">
                {group.description || "No description"}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-sm font-medium text-white flex-shrink-0">
                  {group.primaryUser.name.charAt(0)}
                </div>

                <div>
                  <p className="text-neutral-900 font-medium">
                    {group.primaryUser.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {group.primaryUser.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {group.members.length}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleViewGroup(group.id)}
                  className="px-2 h-8 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors border border-neutral-300 rounded-lg"
                >
                  View
                </button>

                <button
                  onClick={() => handleEditGroup(group.id)}
                  className="px-2 h-8 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors border border-neutral-300 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteGroup(group.id, group.name)}
                  className="inline-flex items-center justify-center gap-1 px-2 h-8 text-xs font-medium text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Family;
