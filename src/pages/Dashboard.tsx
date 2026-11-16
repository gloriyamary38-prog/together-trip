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
  return (
    <div className="max-w-5xl">
      <div className="mb-6">
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
          <h2 className="text-lg font-semibold text-neutral-900">Explore &amp; Plan</h2>
          <p className="text-sm text-neutral-500">Choose where to begin your family journey.</p>
        </div>
        <Link
          to="/create-trip"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create a Trip
        </Link>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-neutral-900">Your Active Trips</h2>
            <Link to="/trips" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 underline">
              View all
            </Link>
          </div>
          <div className="border border-neutral-200 rounded-lg p-4">
            <div className="flex gap-4">
              <div className="w-32 h-24 rounded-lg bg-neutral-100 flex flex-col items-center justify-center flex-shrink-0">
                <ImageIcon className="w-6 h-6 text-neutral-400 mb-1" />
                <span className="text-xs text-neutral-400">Destination image</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-neutral-900 mb-1">Family Trip to Ooty</h3>
                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    12–15 January
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    6 travellers
                  </span>
                </div>
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
                  <Link
                    to="/trips/1"
                    className="inline-flex items-center gap-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors flex-shrink-0"
                  >
                    Continue Planning
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">Pending Actions</h2>
          <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-neutral-900">Family responses</p>
                <p className="text-xs text-neutral-500">Trip invitations awaiting reply</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-medium border border-neutral-300 rounded text-neutral-700">
                2 pending
              </span>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-neutral-900">Itinerary preferences</p>
                <p className="text-xs text-neutral-500">Choices need your review</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-medium border border-neutral-300 rounded text-neutral-700">
                1 pending
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-neutral-900">Past Trips</h2>
          <Link to="/trips" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Trip to Munnar", "Trip to Kanyakumari"].map((trip) => (
            <button
              key={trip}
              className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg text-left hover:border-neutral-300 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                <ImageIcon className="w-5 h-5 text-neutral-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900">{trip}</p>
                <p className="text-sm text-neutral-500">View trip details</p>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
