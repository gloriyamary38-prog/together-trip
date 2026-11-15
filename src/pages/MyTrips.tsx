import { Link } from "react-router-dom";
import { Plus, MapPin, Calendar, Users } from "lucide-react";

const MyTrips = () => {
  const trips = [
    {
      id: 1,
      name: "Summer Vacation 2024",
      destination: "Barcelona, Spain",
      dates: "Jul 15 - Jul 22, 2024",
      members: 6,
      status: "Planning",
    },
    {
      id: 2,
      name: "Family Reunion",
      destination: "Lake Tahoe, CA",
      dates: "Aug 5 - Aug 10, 2024",
      members: 8,
      status: "Booked",
    },
    {
      id: 3,
      name: "Christmas in New York",
      destination: "New York, NY",
      dates: "Dec 20 - Dec 27, 2024",
      members: 4,
      status: "Idea",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">My Trips</h1>
          <p className="text-neutral-600">Manage and organize all your family trips in one place.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
          <Plus className="w-4 h-4" />
          New Trip
        </button>
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
