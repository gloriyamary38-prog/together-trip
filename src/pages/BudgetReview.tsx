import { Wallet } from "lucide-react";

const BudgetReview = () => {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Budget Review</h1>
        <p className="text-neutral-600">Review the complete budget before finalising.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-neutral-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-neutral-600" />
            </div>
            <h2 className="text-lg font-semibold text-neutral-900">Total Budget</h2>
          </div>
          <p className="text-3xl font-bold text-neutral-900">₹50,000</p>
        </div>

        <div className="border border-neutral-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-neutral-600" />
            </div>
            <h2 className="text-lg font-semibold text-neutral-900">Total Contributions</h2>
          </div>
          <p className="text-3xl font-bold text-neutral-900">₹50,000</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetReview;