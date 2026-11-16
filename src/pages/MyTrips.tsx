import { Link } from "react-router-dom";
import { Plus, MapPin, Calendar, Users } from "lucide-react";

const MyTrips = () => {
  const trips = [
    {
      id: 1,
      name: "Family Trip to Ooty",
      destination: "Ooty, Tamil Nadu",
      dates: "12–15 January",
      members: 6,
      status: "Active",
    },
    {
      id: 2,
      name: "Trip to Munnar",
      destination: "Munnar, Kerala",
      dates: "Mar 5 - Mar 10",
      members: 4,
      status: "Completed",
    },
    {
      id: 3,
      name: "Trip to Kanyakumari",
      destination: "Kanyakumari, TN",
      dates: "Dec 20 - Dec 27",
      members: 4,
      status: "Completed",
    },
  ];

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">My Trips</h1>
          <p className="text-neutral-600">Manage and organize all your family trips in one place.</p>
        </div>
        <Link
          to="/create-trip"
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Trip
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <Link
            key={trip.id}
            to={`/trips/${trip.id}`}
            className="bg-white border border-neutral-200 rounded-lg p-6 hover:border-neutral-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-neutral-600" />
              </div>
              <span className="px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-600 rounded-full">
                {trip.status}
              </span>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">{trip.name}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <MapPin className="w-4 h-4" />
                {trip.destination}
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Calendar className="w-4 h-4" />
                {trip.dates}
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Users className="w-4 h-4" />
                {trip.members} members
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyTrips;
