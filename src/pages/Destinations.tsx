import { MapPin } from "lucide-react";

const Destinations = () => {
  const destinations = [
    { name: "Ooty, Tamil Nadu", country: "India", trips: 2, image: "IMAGE" },
    { name: "Munnar, Kerala", country: "India", trips: 1, image: "IMAGE" },
    { name: "Kanyakumari, Tamil Nadu", country: "India", trips: 1, image: "IMAGE" },
    { name: "Goa, Goa", country: "India", trips: 0, image: "IMAGE" },
    { name: "Manali, Himachal Pradesh", country: "India", trips: 0, image: "IMAGE" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Destinations</h1>
        <p className="text-neutral-600">Discover places to visit with your family.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <div key={destination.name} className="border border-neutral-200 rounded-lg p-6">
            <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-neutral-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-1">{destination.name}</h3>
            <p className="text-sm text-neutral-500 mb-2">{destination.country}</p>
            <p className="text-sm text-neutral-600">{destination.trips} trips planned</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
