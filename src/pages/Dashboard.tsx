import { useEffect, useState } from "react";
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

// Primary accent color from UI Studio reference: violet-600
const PRIMARY_VIOLET = "#8B7CF6";
const VIOLET_BG = "#F5F5F7";
const CHARCOAL = "#242424";
const SECONDARY_GRAY = "#6B7280";
const BORDER_GRAY = "#E5E7EB";
const CARD_BG = "#FFFFFF";

const exploreCards = [
  {
    title: "Destinations",
    description: "Discover places for your next family journey.",
    icon: MapPin,
  },
  {
    title: "Experiences",
    description: "Explore activities and interests.",
    icon: Compass,
  },
  {
    title: "Stay & Travel",
    description: "Explore accommodation and transport.",
    icon: Calendar,
  },
  {
    title: "Planning Guide",
    description: "Get guidance for planning your trip.",
    icon: ImageIcon,
  },
];

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
    <div className="bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <h1 className="text-xl font-bold text-gray-900">TogetherTrip</h1>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors">
              Planning
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search destinations, places and experiences..."
              className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          <button className="h-11 px-6 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors ml-2">
            Search
          </button>
        </div>

        {/* Explore Cards */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {exploreCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                type="button"
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {card.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    {card.description}
                  </p>
                </div>

                <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Itinerary */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Itinerary
            </h2>

            <p className="text-sm text-gray-500/60">
              Manage day-wise itineraries for your trips.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/itinerary"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-4 h-4" /> Itinerary
            </Link>
          </div>
        </div>

        {/* Active Trips */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Active Trips
            </h2>

            <p className="text-sm text-gray-500/60">
              Continue planning your upcoming journeys.
            </p>
          </div>

          {activeTrips.length === 0 ? (
            <div className="border border-gray-200 rounded-lg p-6 text-center">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-3" />

              <p className="text-sm font-medium text-gray-800">
                No active trips yet
              </p>

              <p className="text-sm text-gray-500/60 mt-1">
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
                    className="block p-5 border border-gray-200 rounded-lg bg-white hover:border-primary-300 transition-colors"
                    style={{ borderColor: trip.status === "Invitations Sent" ? PRIMARY_VIOLET : BORDER_GRAY }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-gray-500" />
                      </div>

                      <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                        {trip.status || "Planning"}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {trip.name || "Untitled Trip"}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{getDestinations(trip)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-3 h-3 shrink-0" />
                        <span>
                          {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="w-3 h-3 shrink-0" />
                        <span>{getTravellerCount(trip)} travellers</span>
                      </div>
                    </div>

                    {/* Planning Progress */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">
                          Planning progress
                        </span>

                        <span className="text-xs font-semibold text-gray-900">
                          {progress}%
                        </span>
                      </div>

                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        Invitation stage completed
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 mt-4 text-sm font-medium text-gray-700">
                      <span>Continue Planning</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Past Trips */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Past Trips
            </h2>

            <Link
              to="/trips"
              className="text-sm font-medium text-gray-500 hover:text-primary-600 underline"
            >
              View All
            </Link>
          </div>

          {pastTrips.length === 0 ? (
            <p className="text-sm text-gray-500/60">
              Your completed trips will appear here.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pastTrips.map((trip) => {
                return (
                  <Link
                    key={trip.id}
                    to={`/trips/${trip.id}`}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg text-left hover:border-primary-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {trip.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {getDestinations(trip)}
                      </p>
                    </div>

                    <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Groups */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Groups
            </h2>

            <Link
              to="/groups"
              className="text-sm font-medium text-gray-500 hover:text-primary-600 underline"
            >
              View All
            </Link>
          </div>

          <p className="text-sm text-gray-500/60 mb-4">
            Plan and travel with the people who matter most.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/family"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg text-left hover:border-primary-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-gray-500" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  Family
                </p>

                <p className="text-sm text-gray-500">
                  View family members
                </p>
              </div>

              <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
            </Link>

            <Link
              to="/groups"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg text-left hover:border-primary-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-gray-500" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  Friends
                </p>

                <p className="text-sm text-gray-500">
                  View groups
                </p>
              </div>

              <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;