import { useNavigate } from "react-router-dom";
import TripWorkflowLayout from "@/components/TripWorkflowLayout";

const ReviewSendInvitation = () => {
  const navigate = useNavigate();

  const summary = (
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-xs text-neutral-500 mb-1">Trip name</p>
        <p className="font-medium text-neutral-900">Family Trip to Ooty</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Destination</p>
        <p className="font-medium text-neutral-900">Ooty, Tamil Nadu</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Dates</p>
        <p className="font-medium text-neutral-900">12–15 January</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Family members</p>
        <p className="font-medium text-neutral-900">6 travellers</p>
      </div>
    </div>
  );

  return (
    <TripWorkflowLayout
      step={5}
      title="Review & Send Invitation"
      subtitle="Review the trip details and send invitations to your family members."
      onBack={() => navigate("/create-trip/4")}
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
              <span className="font-medium text-neutral-900">Family Trip to Ooty</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Destination</span>
              <span className="font-medium text-neutral-900">Ooty, Tamil Nadu</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Dates</span>
              <span className="font-medium text-neutral-900">12–15 January</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Travellers</span>
              <span className="font-medium text-neutral-900">6</span>
            </div>
          </div>
        </div>

        <div className="border border-neutral-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Invitations</h3>
          <div className="space-y-2">
            {["Meena", "Arjun", "Karthik", "Rahul", "Sneha"].map((name) => (
              <div key={name} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                <span className="text-sm text-neutral-900">{name}</span>
                <span className="px-2.5 py-1 text-xs font-medium border border-neutral-300 rounded text-neutral-700">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TripWorkflowLayout>
  );
};

export default ReviewSendInvitation;
