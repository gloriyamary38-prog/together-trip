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

import { useTrip } from "@/contexts/TripContext";
import { ItineraryLanding, ItineraryWorkspace } from "@/pages";

const formatDate = (date?: string) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getDestinations = (trip: any) => {
  const destinations =
    trip.proposedDestinations || trip.destination || [];

  return Array.isArray(destinations)
    ? destinations.join(", ")
    : destinations || "—";
};

const getTravellerCount = (trip: any) => {
  const familyCount = trip.familyMembers?.length || 0;
  const invitedCount = trip.invitedMembers?.length || 0;

  return familyCount + invitedCount;
};

const Dashboard = () => {
  const { trips } = useTrip();

  // Show trips that have entered the planning process.
  const activeTrips = trips.filter(
    (trip) =>
      trip.status === "Invitations Sent" ||
      trip.invitationStatus === "Sent" ||
      Boolean(trip.invitationsSentAt)
  );

  const pastTrips = trips.filter((trip) => {
    const status = (trip.status || "").toLowerCase();

    return status === "completed" || status === "finalised";
  });

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Plan memorable journeys together with your family.
        </h1>

        <p className="text-neutral-600 mb-6">
          Discover destinations, plan your itinerary, share choices and
          create memorable family journeys.
        </p>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <img src="/search.svg" alt="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />

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
          <h2 className="text-lg font-semibold text-neutral-900">
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

      {/* Itinerary */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-neutral-900">
            Itinerary
          </h2>

          <p className="text-sm text-neutral-500">
            Manage day-wise itineraries for your trips.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/itinerary"
            className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <Calendar className="w-4 h-4" /> Itinerary
          </Link>
        </div>
      </div>

      {/* Active Trips */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-neutral-900">
            Active Trips
          </h2>

          <p className="text-sm text-neutral-500">
            Continue planning your upcoming journeys.
          </p>
        </div>

        {activeTrips.length === 0 ? (
          <div className="border border-neutral-200 rounded-lg p-6 text-center">
            <MapPin className="w-8 h-8 text-neutral-400 mx-auto mb-3" />

            <p className="text-sm font-medium text-neutral-800">
              No active trips yet
            </p>

            <p className="text-sm text-neutral-500 mt-1">
              Your trips will appear here after planning begins.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTrips.map((trip) => {
              const progress = 25;

              return (
                <Link
                  key={trip.id}
                  to={`/trips/${trip.id}/invitations`}
                  className="block p-5 border border-neutral-200 rounded-lg bg-white hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-neutral-600" />
                    </div>

                    <span className="px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 rounded-full">
                      {trip.status || "Planning"}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-neutral-900 mb-2">
                    {trip.name || "Untitled Trip"}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>{getDestinations(trip)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>
                        {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Users className="w-4 h-4 shrink-0" />
                      <span>{getTravellerCount(trip)} travellers</span>
                    </div>
                  </div>

                  {/* Planning Progress */}
                  <div className="border-t border-neutral-100 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-neutral-600">
                        Planning progress
                      </span>

                      <span className="text-xs font-semibold text-neutral-900">
                        {progress}%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neutral-900 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="text-xs text-neutral-500 mt-2">
                      Invitation stage completed
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-4 text-sm font-medium text-neutral-700">
                    <span>Continue Planning</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Past Trips */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-neutral-900">
              Past Trips
            </h2>

            <Link
              to="/trips"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 underline"
            >
              View All
            </Link>
          </div>

          {pastTrips.length === 0 ? (
            <p className="text-sm text-neutral-500">
              Your completed trips will appear here.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pastTrips.map((trip) => {
                return (
                  <Link
                    key={trip.id}
                    to={`/trips/${trip.id}`}
                    className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg text-left hover:border-neutral-300 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-5 h-5 text-neutral-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-neutral-900">{trip.name}</p>

                      <p className="text-sm text-neutral-500">
                        {getDestinations(trip)}
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Groups */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-neutral-900">
              Groups
            </h2>

            <Link
              to="/groups"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 underline"
            >
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
                <p className="text-sm font-semibold text-neutral-900">
                  Family
                </p>

                <p className="text-sm text-neutral-500">
                  View family members
                </p>
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
                <p className="text-sm font-semibold text-neutral-900">
                  Friends
                </p>

                <p className="text-sm text-neutral-500">
                  View groups
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-neutral-400 flex-shrink-0" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;