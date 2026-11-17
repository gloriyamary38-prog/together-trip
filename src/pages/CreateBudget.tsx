import { Wallet } from "lucide-react";

const CreateBudget = () => {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Create Budget</h1>
        <p className="text-neutral-600">Set up a budget for your family trip.</p>
      </div>

      <div className="border border-neutral-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-neutral-600" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Budget Details</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Total Budget</label>
            <input
              type="text"
              placeholder="e.g. ₹50,000"
              className="w-full h-11 px-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Currency</label>
            <select className="w-full h-11 px-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900">
              <option>INR (₹)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBudget;