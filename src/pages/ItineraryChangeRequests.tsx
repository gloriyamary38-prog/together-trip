import { Calendar } from "lucide-react";

const ItineraryChangeRequests = () => {
  const requests = [
    { member: "Arjun", request: "Add a beach day on Day 3", status: "Pending" },
    { member: "Meena", request: "Change lunch spot to local restaurant", status: "Approved" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Itinerary Change Requests</h1>
        <p className="text-neutral-600">Review and manage change requests from family members.</p>
      </div>

      <div className="space-y-6">
        {requests.map((request, i) => (
          <div key={i} className="border border-neutral-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-neutral-600" />
                </div>
                <h3 className="font-semibold text-neutral-900">{request.member}</h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-medium border border-neutral-300 rounded text-neutral-700">
                {request.status}
              </span>
            </div>
            <p className="text-sm text-neutral-600">{request.request}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryChangeRequests;