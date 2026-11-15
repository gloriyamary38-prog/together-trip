import { Users } from "lucide-react";

const Family = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Family</h1>
        <p className="text-neutral-600">Manage your family members and their roles.</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
            <Users className="w-5 h-5 text-neutral-600" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Family Members</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "John Doe", role: "Family Admin", initials: "JD" },
            { name: "Jane Doe", role: "Admin", initials: "JD" },
            { name: "Emma Doe", role: "Member", initials: "ED" },
            { name: "Michael Doe", role: "Member", initials: "MD" },
            { name: "Grandma Rose", role: "Member", initials: "GR" },
            { name: "Grandpa Joe", role: "Member", initials: "GJ" },
          ].map((member, i) => (
            <div key={i} className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                <span className="text-sm font-medium text-neutral-600">{member.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">{member.name}</p>
                <p className="text-xs text-neutral-500 truncate">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Family;
