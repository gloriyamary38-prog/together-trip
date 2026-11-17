import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const TripConfirmation = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="border border-neutral-200 rounded-lg p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-neutral-900" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Trip Confirmed!</h1>
        <p className="text-neutral-600 mb-8 max-w-md">
          Your family trip has been finalised and is ready to be planned. The itinerary and budget will now
          be prepared.
        </p>
        <div className="flex items-center gap-3">
          <Link
            to="/home"
            className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/trips"
            className="px-5 py-2.5 border border-neutral-300 text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors"
          >
            View My Trips
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripConfirmation;
