import { Calendar } from "lucide-react";

const MemberItineraryReview = () => {
  const members = [
    { name: "Meena", status: "Reviewed", comments: "Looks good!" },
    { name: "Arjun", status: "Reviewed", comments: "Can we add a beach day?" },
    { name: "Karthik", status: "Pending", comments: "" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Member Itinerary Review</h1>
        <p className="text-neutral-600">Review the itinerary from your family members' perspective.</p>
      </div>

      <div className="space-y-6">
        {members.map((member) => (
          <div key={member.name} className="border border-neutral-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-neutral-600" />
                </div>
                <h3 className="font-semibold text-neutral-900">{member.name}</h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-medium border border-neutral-300 rounded text-neutral-700">
                {member.status}
              </span>
            </div>
            {member.comments && (
              <p className="text-sm text-neutral-600">{member.comments}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberItineraryReview;