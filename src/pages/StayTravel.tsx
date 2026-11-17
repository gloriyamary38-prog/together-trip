import { Calendar } from "lucide-react";

const StayTravel = () => {
  const options = [
    { type: "Hotel", name: "Riverside Resort", location: "Ooty", price: "₹8,000/night" },
    { type: "Homestay", name: "Cozy Cottage", location: "Munnar", price: "₹3,500/night" },
    { type: "Villa", name: "Hilltop Villa", location: "Goa", price: "₹12,000/night" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Stay &amp; Travel</h1>
        <p className="text-neutral-600">Explore accommodation and transport options.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((option) => (
          <div key={option.name} className="border border-neutral-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-neutral-600" />
              </div>
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                {option.type}
              </span>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-1">{option.name}</h3>
            <p className="text-sm text-neutral-500 mb-2">{option.location}</p>
            <p className="text-sm font-medium text-neutral-900">{option.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StayTravel;
