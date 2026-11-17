import { Calendar } from "lucide-react";

const DayWiseItinerary = () => {
  const days = [
    { day: 1, title: "Arrival & Exploration", activities: ["Check-in at hotel", "Lunch at local restaurant", "Evening walk"] },
    { day: 2, title: "Nature & Adventure", activities: ["Morning trek", "Picnic lunch", "Sunset viewpoint"] },
    { day: 3, title: "Culture & Heritage", activities: ["Heritage walk", "Museum visit", "Local market"] },
    { day: 4, title: "Departure", activities: ["Breakfast", "Check-out", "Departure"] },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Day-wise Itinerary</h1>
        <p className="text-neutral-600">View the day-by-day plan for your family trip.</p>
      </div>

      <div className="space-y-6">
        {days.map((day) => (
          <div key={day.day} className="border border-neutral-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-neutral-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Day {day.day}: {day.title}</h3>
                <p className="text-sm text-neutral-500">{day.activities.length} activities</p>
              </div>
            </div>
            <div className="space-y-2">
              {day.activities.map((activity, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg">
                  <span className="text-sm text-neutral-700">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayWiseItinerary;