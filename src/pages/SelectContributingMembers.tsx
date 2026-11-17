import { Users } from "lucide-react";

const SelectContributingMembers = () => {
  const members = [
    { name: "Priya", role: "Trip Owner", contributing: true },
    { name: "Meena", role: "Family Member", contributing: true },
    { name: "Arjun", role: "Family Member", contributing: true },
    { name: "Karthik", role: "Family Member", contributing: false },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Select Contributing Members</h1>
        <p className="text-neutral-600">Choose which members will contribute to the trip budget.</p>
      </div>

      <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200">
        {members.map((member) => (
          <div key={member.name} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-neutral-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">{member.name}</p>
                <p className="text-xs text-neutral-500">{member.role}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 text-xs font-medium border border-neutral-300 rounded text-neutral-700">
              {member.contributing ? "Contributing" : "Not contributing"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectContributingMembers;