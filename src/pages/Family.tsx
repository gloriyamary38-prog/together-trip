import { Users, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Family = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Family & Groups</h1>
        <p className="text-neutral-600">Create and manage your travel groups.</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
            <Users className="w-8 h-8 text-neutral-400" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">
            No groups created yet
          </h2>
          <p className="text-neutral-600 mb-6 max-w-md">
            Create your first group to bring family and friends together for travel planning.
          </p>
          <button
            onClick={() => navigate("/family/create-group")}
            className="inline-flex items-center gap-2 px-6 h-10 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default Family;