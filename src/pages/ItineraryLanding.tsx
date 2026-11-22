import { useEffect, useState } from "react";
import { useTrip } from "@/contexts/TripContext";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Check,
  Plus,
  Users,
} from "lucide-react";

const ItineraryLanding = () => {
  const { trips } = useTrip();
  const { id: tripId } = useParams();

  const [activeTrips, setActiveTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    // Show trips that have entered the planning process (same logic as MyTrips)
    const sentTrips = trips.filter(
      (trip) =>
        trip.status === "Invitations Sent" ||
        trip.invitationStatus === "Sent" ||
        Boolean(trip.invitationsSentAt)
    );
    setActiveTrips(sentTrips);
  }, [trips]);

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
  };

  const handleNewItinerary = () => {
    // Navigate to workspace with a new/empty itinerary
    // For now, show a message or navigate to workspace with no trip
    // In a full implementation, this would allow creating a new trip
    window.alert("New itinerary creation - select an existing trip or create a new one");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white border border-neutral-200 rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Itinerary Management
        </h1>
        <p className="text-neutral-600 mb-4">
          Create and manage day-wise itineraries for your trips.
        </p>

        <div className="flex gap-3 mb-6">
          <Link
            to="/trips"
            className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Trips
          </Link>

          <Plus className="w-4 h-4 mr-2" />
          <span>New Itinerary</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-neutral-900 mb-4">
        Active Trip Itineraries
      </h2>

      {activeTrips.length === 0 ? (
        <div className="border border-neutral-200 rounded-lg p-8 text-center">
          <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-neutral-800 mb-2">
            No active itineraries yet
          </h3>
          <p className="text-sm text-neutral-500">
            Active trips will appear here after invitations are sent.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeTrips.map((trip) => {
            const destinations =
              trip.proposedDestinations?.length > 0
                ? trip.proposedDestinations.join(", ")
                : trip.destination || "—";

            const memberCount =
              (trip.familyMembers?.length || 0) +
              (trip.invitedMembers?.length || 0) +
              1;

            const formatDate = (date) => {
              if (!date) return "—";
              const d = new Date(date);
              if (Number.isNaN(d.getTime())) return date;
              return d.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
            };

            return (
              <div
                key={trip.id}
                className="border border-neutral-200 rounded-lg p-6 hover:border-neutral-300 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-neutral-600" />
                  </div>

                  <div>
                    <h4 className="font-medium text-neutral-900 mb-1">
                      {trip.name || "Untitled Trip"}
                    </h4>
                    <p className="text-sm text-neutral-600">
                      {destinations}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600">
                  <div>
                    <span>{formatDate(trip.startDate)} –</span>
                    <span>{formatDate(trip.endDate)}</span>
                  </div>
                  <div>
                    <span>{memberCount} travellers</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTrip(trip)}
                  className="mt-4 w-full py-3 border border-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Manage Itinerary
                </button>
              </div>
            );
          })}
        </div>
      )}

      {selectedTrip && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Itinerary: {selectedTrip.name}
          </h2>
          <p className="text-neutral-600 mb-4">
            Manage day-wise activities for this trip.
          </p>
          {/* Placeholder for itinerary workspace */}
          <div className="p-8 text-center text-neutral-500">
            <Calendar className="w-12 h-12 mx-auto mb-3" />
            <p>Select a trip to begin managing its itinerary</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryLanding;