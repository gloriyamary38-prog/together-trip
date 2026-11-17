import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";

const TripWorkspace = () => {
  return (
    <div className="max-w-5xl">
      <Link
        to="/trips"
        className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to My Trips
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-neutral-900">Family Trip to Ooty</h1>
            <span className="px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-600 rounded-full">
              Active
            </span>
          </div>
          <p className="text-neutral-600">Manage your family trip workspace.</p>
        </div>
        <Link
          to="/create-trip"
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Continue Planning
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="border border-neutral-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Trip Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-neutral-700">Destination: Ooty, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-neutral-700">Dates: 12–15 January</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-neutral-700">6 travellers</span>
              </div>
            </div>
          </div>

          <div className="border border-neutral-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Trip Progress</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                  <span>Planning progress</span>
                  <span className="font-medium text-neutral-900">65%</span>
                </div>
                <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-neutral-900 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">Trip Actions</h2>
          <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200">
            {[
              { label: "Review & Send Invitation", path: "/create-trip/5" },
              { label: "Itinerary Planner", path: "/itinerary" },
              { label: "Budget Overview", path: "/budget" },
              { label: "Travel Hub", path: "/travel-hub" },
            ].map((action) => (
              <Link
                key={action.label}
                to={action.path}
                className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
              >
                <span className="text-sm font-medium text-neutral-900">{action.label}</span>
                <span className="text-neutral-400">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripWorkspace;
