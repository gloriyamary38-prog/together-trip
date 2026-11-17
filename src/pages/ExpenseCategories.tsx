import { Wallet } from "lucide-react";

const ExpenseCategories = () => {
  const categories = [
    { name: "Accommodation", amount: "₹20,000" },
    { name: "Transport", amount: "₹10,000" },
    { name: "Food & Dining", amount: "₹8,000" },
    { name: "Activities", amount: "₹7,000" },
    { name: "Miscellaneous", amount: "₹5,000" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Expense Categories</h1>
        <p className="text-neutral-600">Break down your trip budget into categories.</p>
      </div>

      <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-neutral-600" />
              </div>
              <span className="text-sm font-medium text-neutral-900">{category.name}</span>
            </div>
            <span className="text-sm font-medium text-neutral-900">{category.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseCategories;