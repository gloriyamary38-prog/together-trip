
import { Link } from "react-router-dom";
import { Plus, MapPin, Calendar, Users, Trash2 } from "lucide-react";
import { useTrip } from "@/contexts/TripContext";

const MyTrips = () => {
  const { trips, deleteTrip } = useTrip();

  // Show trips only after invitations have been sent.
  const sentTrips = trips.filter(
    (trip) =>
      trip.status === "Invitations Sent" ||
      trip.invitationStatus === "Sent" ||
      Boolean(trip.invitationsSentAt)
  );

  const formatDate = (date: string) => {
    if (!date) return "Date not set";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"? This action cannot be undone.`
    );

    if (confirmed) {
      deleteTrip(id);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            My Trips
          </h1>
          <p className="text-neutral-600">
            Manage and organize all your family trips in one place.
          </p>
        </div>

        <Link
          to="/create-trip"
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Trip
        </Link>
      </div>

      {sentTrips.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-lg p-12 text-center">
          <MapPin className="w-10 h-10 text-neutral-400 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            No trips yet
          </h2>
          <p className="text-sm text-neutral-600 mb-6">
            Your trips will appear here after you send invitations.
          </p>
          <Link
            to="/create-trip"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800"
          >
            <Plus className="w-4 h-4" />
            Create Your First Trip
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sentTrips.map((trip) => {
            const destinations =
              trip.proposedDestinations?.length > 0
                ? trip.proposedDestinations.join(", ")
                : trip.destination || "Destination not added";

            const memberCount =
              (trip.familyMembers?.length || 0) +
              (trip.invitedMembers?.length || 0) +
              1;

            return (
              <div
                key={trip.id}
                className="bg-white border border-neutral-200 rounded-lg p-6 hover:border-neutral-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-neutral-600" />
                  </div>

                  <span className="px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-600 rounded-full">
                    {trip.status || "Invitations Sent"}
                  </span>
                </div>

                <Link
                  to={`/trips/${trip.id}`}
                  className="block"
                >
                  <h3 className="font-semibold text-neutral-900 mb-3 hover:underline">
                    {trip.name || "Untitled Trip"}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>{destinations}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>
                        {formatDate(trip.startDate)} –{" "}
                        {formatDate(trip.endDate)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Users className="w-4 h-4 shrink-0" />
                      <span>{memberCount} travellers</span>
                    </div>
                  </div>
                </Link>

                <div className="border-t border-neutral-100 pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDelete(trip.id, trip.name)}
                    className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Trip
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
