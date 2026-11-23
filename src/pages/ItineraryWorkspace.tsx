
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTrip } from "@/contexts/TripContext";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Calendar,
  Check,
  Plus,
  Shield,
} from "lucide-react";

type Activity = {
  day: number;
  activity: string;
  place: string;
  startTime: string;
  endTime: string;
  description: string;
};

type Note = {
  day: number;
  note: string;
};

const ItineraryWorkspace = () => {
  const { id: tripId } = useParams();
  const { trips, updateTrip } = useTrip();
  const navigate = useNavigate();
  const { toast } = useToast();

  const trip = trips.find((item) => item.id === tripId);

  const [currentDay, setCurrentDay] = useState(1);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    if (!trip) {
      toast({
        title: "Trip not found",
        description: "The selected trip could not be located.",
        variant: "destructive",
      });
      navigate("/trips");
    }
  }, [trip, navigate, toast]);

  if (!trip) {
    return null;
  }

  const destinations =
    trip.proposedDestinations?.length > 0
      ? trip.proposedDestinations.join(", ")
      : trip.destination || "—";

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

  const memberCount =
    (trip.familyMembers?.length || 0) +
    (trip.invitedMembers?.length || 0) +
    1;

  const travelStart = trip.startDate
    ? new Date(trip.startDate)
    : new Date();

  const travelEnd = trip.endDate
    ? new Date(trip.endDate)
    : new Date();

  const totalDays = Math.max(
    1,
    Math.ceil(
      (travelEnd.getTime() - travelStart.getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1
  );

  const dayLabels = Array.from(
    { length: totalDays },
    (_, index) => {
      const date = new Date(
        travelStart.getTime() +
          index * 24 * 60 * 60 * 1000
      );

      return {
        day: index + 1,
        date: date.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
    }
  );

  const handleAddActivity = () => {
    setActivities((previous) => [
      ...previous,
      {
        day: currentDay,
        activity: "",
        place: "",
        startTime: "",
        endTime: "",
        description: "",
      },
    ]);
  };

  const handleSaveActivity = (
    activityData: Partial<Activity>
  ) => {
    setActivities((previous) =>
      previous.map((item) =>
        item.day === currentDay
          ? { ...item, ...activityData }
          : item
      )
    );
  };

  const handleSaveNote = () => {
    if (!noteInput.trim()) return;

    setNotes((previous) => [
      ...previous,
      {
        day: currentDay,
        note: noteInput.trim(),
      },
    ]);

    setNoteInput("");

    toast({
      title: "Note saved",
      description: "Your travel note has been added.",
    });
  };

  return (
    <div className="max-w-7xl space-y-6">

      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center justify-between">
          <Link
            to="/trips"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Trips
          </Link>

          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-neutral-500" />
            <span className="text-sm text-neutral-500 id-label">
              Itinerary # {trip.id.slice(-6)}
            </span>
          </div>
        </div>
      </div>

      {/* Trip Information Card */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-3">
          Trip Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-neutral-500">Trip Name</p>
            <p className="font-medium text-neutral-900">
              {trip.name || "—"}
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">Destination</p>
            <p className="font-medium text-neutral-900">
              {destinations}
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">Travel Dates</p>
            <p className="font-medium text-neutral-900">
              {formatDate(trip.startDate)} –{" "}
              {formatDate(trip.endDate)}
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-500">
              Total Travellers
            </p>
            <p className="font-medium text-neutral-900">
              {memberCount}
            </p>
          </div>
        </div>

        {/* Member Avatars */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ...(trip.familyMembers?.map(
              (member) => member.name
            ) || []),
            ...(trip.invitedMembers?.map(
              (member) => member.name
            ) || []),
          ]
            .slice(0, 3)
            .map((name, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-medium text-neutral-700"
              >
                {name ? name.charAt(0) : "—"}
              </div>
            ))}
        </div>
      </div>

      {/* Day Navigation */}
      <div className="bg-white border border-neutral-200 rounded-lg p-3 mb-6">
        <div className="flex gap-1 flex-wrap">
          {dayLabels.map((day) => (
            <button
              key={day.day}
              className={`flex-1 min-w-fit px-3 py-2 rounded-lg ${
                currentDay === day.day
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              } text-center text-sm font-medium transition-colors`}
              onClick={() => setCurrentDay(day.day)}
            >
              Day {day.day} – {day.date}
            </button>
          ))}
        </div>
      </div>

      {/* Main Itinerary Area */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Day {currentDay} –{" "}
          {dayLabels.find(
            (day) => day.day === currentDay
          )?.date || "—"}
        </h3>

        {/* Add Activity */}
        <div className="mb-4 flex items-center gap-2">
          <button
            onClick={handleAddActivity}
            className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add First Activity
          </button>
        </div>

        {/* Activities */}
        {activities.filter(
          (activity) => activity.day === currentDay
        ).length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
            <p className="text-sm text-neutral-500">
              No activities added for Day {currentDay}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities
              .map((activity, index) => ({
                activity,
                index,
              }))
              .filter(
                ({ activity }) =>
                  activity.day === currentDay
              )
              .map(({ activity, index }) => (
                <div
                  key={index}
                  className="p-3 border border-neutral-200 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-sm text-neutral-600 activity-name">
                      {activity.activity || "—"}
                    </span>

                    <span className="ml-3 text-xs text-neutral-500">
                      ({activity.place || "—"})
                    </span>
                  </div>

                  <div className="text-xs text-neutral-500 mt-1">
                    {activity.startTime || "—"} –{" "}
                    {activity.endTime || "—"}
                  </div>

                  {activity.description && (
                    <p className="text-xs text-neutral-500 mt-1">
                      {activity.description}
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Notes Section */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-3">
          Notes
        </h3>

        {notes.filter(
          (note) => note.day === currentDay
        ).length === 0 ? (
          <p className="text-sm text-neutral-500 mb-4">
            No notes added for Day {currentDay}
          </p>
        ) : (
          <div className="space-y-2 mb-4">
            {notes
              .filter((note) => note.day === currentDay)
              .map((note, index) => (
                <div
                  key={index}
                  className="p-3 border-l border-neutral-300"
                >
                  <p className="font-medium text-neutral-900 mb-1">
                    {note.note}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {dayLabels.find(
                      (day) => day.day === note.day
                    )?.date || "—"}
                  </p>
                </div>
              ))}
          </div>
        )}

        <div className="mt-4">
          <textarea
            placeholder="Add travel tips, bookings, reminders..."
            value={noteInput}
            onChange={(event) =>
              setNoteInput(event.target.value)
            }
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm resize-none"
            rows={3}
          />

          <button
            onClick={handleSaveNote}
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <Check className="w-4 h-4" />
            Save Note
          </button>
        </div>
      </div>

      {/* Right-side Panel */}
      <div className="lg:w-1/4 bg-white border border-neutral-200 rounded-lg p-6 space-y-4">

        {/* Member Preferences */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-3">
            Member Preferences & Suggestions
          </h3>

          <div className="p-3 border border-neutral-200 rounded-lg mb-4">
            <p className="text-sm text-neutral-500 mb-2">
              Suggestions submitted by group members:
            </p>

            <p className="text-sm text-neutral-500">
              No suggestions yet
            </p>

            <p className="text-xs text-neutral-500">
              {memberCount} members have been invited
            </p>
          </div>

          <div className="p-3 border border-neutral-200 rounded-lg">
            <p className="text-xs text-neutral-500">
              Trip Preference Summary
            </p>

            <p className="text-sm text-neutral-500">
              Destination: {destinations}
            </p>

            <p className="text-sm text-neutral-500">
              Common available dates: Based on group availability
            </p>
          </div>
        </div>

        {/* Trip Status */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-3">
            Itinerary Status
          </h3>

          <div className="p-3 border border-neutral-200 rounded-lg">
            <p className="text-sm text-neutral-500">
              Status: Not Started
            </p>

            <p className="text-xs text-neutral-500 mt-1">
              Itinerary is ready for planning
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-6 border-t border-neutral-200">
        <div className="flex gap-3 justify-end">
          <Link
            to="/trips"
            className="flex-1 py-3 px-4 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            Back
          </Link>

          <button
            onClick={() =>
              toast({
                title: "Draft saved",
                description: "Your itinerary draft is ready.",
              })
            }
            className="flex-1 py-3 px-4 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Save as Draft
          </button>

          <button
            onClick={() =>
              toast({
                title: "Itinerary ready",
                description: "Your itinerary is ready to share.",
              })
            }
            className="flex-1 py-3 px-4 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Save & Share Itinerary
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryWorkspace;
