import { useNavigate } from "react-router-dom";
import TripWorkflowLayout from "@/components/TripWorkflowLayout";
import { useTrip } from "@/contexts/TripContext";

const ReviewSendInvitation = () => {
  const navigate = useNavigate();
  const { currentTrip } = useTrip();

  const summary = (
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-xs text-neutral-500 mb-1">Trip name</p>
        <p className="font-medium text-neutral-900">{currentTrip?.name || "—"}</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Destination</p>
        <p className="font-medium text-neutral-900">
          {currentTrip?.proposedDestinations?.length
            ? currentTrip.proposedDestinations.join(", ")
            : currentTrip?.destination || "—"}
        </p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Dates</p>
        <p className="font-medium text-neutral-900">
          {currentTrip?.startDate || "—"} –{" "}
          {currentTrip?.endDate || "—"}
        </p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Trip type</p>
        <p className="font-medium text-neutral-900">{currentTrip?.tripType || "—"}</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Trip purpose</p>
        <p className="font-medium text-neutral-900">{currentTrip?.purpose || "—"}</p>
      </div>
    </div>
  );

  const invitationsSummary = (
    <div className="space-y-2">
      {currentTrip?.invitations?.length > 0 ? (
        currentTrip.invitations.map((inv) => (
          <div
            key={inv.id}
            className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg"
          >
            <span className="text-sm text-neutral-900">{inv.member}</span>
            <span className="px-2.5 py-1 text-xs font-medium border border-neutral-300 rounded text-neutral-700">
              {inv.status}
            </span>
          </div>
        ))
      ) : (
        <p className="text-neutral-500">No invitations sent yet</p>
      )}
    </div>
  );

  return (
    <TripWorkflowLayout
      step={4}
      title="Review & Send Invitation"
      subtitle="Review the trip details and send invitations to your family members."
      onBack={() => navigate("/create-trip/3")}
      onNext={() => navigate("/invitation-sent")}
      nextLabel="Send Invitation"
      summary={summary}
    >
      <div className="space-y-6">
        <div className="border border-neutral-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Trip Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Trip name</span>
              <span className="font-medium text-neutral-900">{currentTrip?.name || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Destination</span>
              <span className="font-medium text-neutral-900">
                {currentTrip?.proposedDestinations?.length
                  ? currentTrip.proposedDestinations.join(", ")
                  : currentTrip?.destination || "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Dates</span>
              <span className="font-medium text-neutral-900">
                {currentTrip?.startDate || "—"} – {" "}
                {currentTrip?.endDate || "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Trip type</span>
              <span className="font-medium text-neutral-900">{currentTrip?.tripType || "—"}</p>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Trip purpose</span>
              <span className="font-medium text-neutral-900">{currentTrip?.purpose || "—"}</span>
            </div>
          </div>
        </div>

        <div className="border border-neutral-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Invitations</h3>
          {invitationsSummary}
        </div>
      </div>
    </TripWorkflowLayout>
  );
};

export default ReviewSendInvitation;