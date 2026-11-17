import { Wallet } from "lucide-react";

const MemberContributions = () => {
  const contributions = [
    { name: "Priya", amount: "₹20,000" },
    { name: "Meena", amount: "₹10,000" },
    { name: "Arjun", amount: "₹10,000" },
    { name: "Karthik", amount: "₹10,000" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Member Contributions</h1>
        <p className="text-neutral-600">Track how much each member is contributing to the trip.</p>
      </div>

      <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200">
        {contributions.map((contribution) => (
          <div key={contribution.name} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-neutral-600" />
              </div>
              <span className="text-sm font-medium text-neutral-900">{contribution.name}</span>
            </div>
            <span className="text-sm font-medium text-neutral-900">{contribution.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberContributions;