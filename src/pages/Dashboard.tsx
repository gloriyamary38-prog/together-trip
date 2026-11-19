import { useTrip } from "@/contexts/TripContext";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Compass,
  Image as ImageIcon,
  MapPin,
  Plus,
  Search,
  Users,
} from "lucide-react";

const exploreCards = [
  { title: "Destinations", description: "Discover places to visit.", icon: MapPin },
  { title: "Experiences", description: "Explore activities and interests.", icon: Compass },
  { title: "Stay & Travel", description: "Explore accommodation and transport.", icon: Calendar },
  { title: "Planning Guide", description: "Tips and travel inspiration.", icon: ImageIcon },
];

const Dashboard = () => {
  const { trips } = useTrip();

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Plan memorable journeys together with your family.
        </h1>
        <p className="text-neutral-600 mb-6">
          Discover destinations, plan your itinerary, share choices and create memorable family journeys.
        </p>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search destinations, places and experiences..."
              className="w-full h-11 pl-10 pr-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>
          <button className="h-11 px-6 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors">
            Search
          </button>
        </div>
      </div>

      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            Explore & Plan
          </h2>
          <p className="text-sm text-neutral-500">
            Choose where to begin your family journey.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {exploreCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.title}
              className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg text-left hover:border-neutral-300 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-neutral-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900">{card.title}</p>
                <p className="text-sm text-neutral-500">{card.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 flex-shrink-0" />
            </button>
          );
        })}
      </div>

      <div className="flex justify-center mb-8">
        <Link
          to="/create-trip"
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Create a Trip
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-neutral-900">Active Trips</h2>
        </div>
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg text-left hover:border-neutral-300 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-neutral-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900">{trip.name}</p>
                  <p className="text-sm text-neutral-500">
                    {trip.destination || "—"}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {trip.startDate || "—"} – {trip.endDate || "—"}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-500 mb-4">
            No active trips yet. Create your first trip to get started.
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-neutral-900">Past Trips</h2>
          <Link
            to="/trips"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 underline"
          >
            View All
          </Link>
        </div>
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg text-left hover:border-neutral-300 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-5 h-5 text-neutral-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900">{trip.name}</p>
                  <p className="text-sm text-neutral-500">{trip.destination || "—"}</p>
                  <p className="text-xs text-neutral-500">{trip.startDate || "—"} – {trip.endDate || "—"}</p>
                  <p className="text-xs text-neutral-500">{trip.members} members</p>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-500 mb-4">
            No past trips yet.
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-neutral-900">Groups</h2>
          <Link to="/groups" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 underline">
            View All
          </Link>
        </div>
        <p className="text-sm text-neutral-500 mb-4">
          Plan and travel with the people who matter most.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/family"
            className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg text-left hover:border-neutral-300 transition-colors"
          >
            <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-neutral-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900">Family</p>
              <p className="text-sm text-neutral-500">6 members</p>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 flex-shrink-0" />
          </Link>
          <Link
            to="/groups"
            className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg text-left hover:border-neutral-300 transition-colors"
          >
            <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-neutral-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900">Friends</p>
              <p className="text-sm text-neutral-500">4 members</p>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-400 flex-shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;