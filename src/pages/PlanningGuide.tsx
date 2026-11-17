import { Image as ImageIcon } from "lucide-react";

const PlanningGuide = () => {
  const guides = [
    { title: "10-Day Family Itinerary", category: "Itinerary" },
    { title: "Budgeting for Family Trips", category: "Budget" },
    { title: "Packing Checklist", category: "Packing" },
    { title: "Safety Tips for Kids", category: "Safety" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Planning Guide</h1>
        <p className="text-neutral-600">Tips and travel inspiration for your family journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide) => (
          <div key={guide.title} className="border border-neutral-200 rounded-lg p-6">
            <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
              <ImageIcon className="w-5 h-5 text-neutral-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-1">{guide.title}</h3>
            <p className="text-sm text-neutral-500">{guide.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanningGuide;
