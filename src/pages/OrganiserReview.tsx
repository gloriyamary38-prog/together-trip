import { Calendar } from "lucide-react";

const OrganiserReview = () => {
  const items = [
    { title: "Day 1: Arrival & Exploration", status: "Approved" },
    { title: "Day 2: Nature & Adventure", status: "Approved" },
    { title: "Day 3: Culture & Heritage", status: "Pending" },
    { title: "Day 4: Departure", status: "Pending" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Organiser Review</h1>
        <p className="text-neutral-600">Review and approve the itinerary as the trip organiser.</p>
      </div>

      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="border border-neutral-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-neutral-600" />
                </div>
                <h3 className="font-semibold text-neutral-900">{item.title}</h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-medium border border-neutral-300 rounded text-neutral-700">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganiserReview;