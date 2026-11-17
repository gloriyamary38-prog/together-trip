import { useNavigate } from "react-router-dom";
import TripWorkflowLayout from "@/components/TripWorkflowLayout";

const MemberPreferenceSubmission = () => {
  const navigate = useNavigate();

  const summary = (
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-xs text-neutral-500 mb-1">Trip name</p>
        <p className="font-medium text-neutral-900">Family Trip to Ooty</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Status</p>
        <p className="font-medium text-neutral-900">Awaiting member responses</p>
      </div>
    </div>
  );

  return (
    <TripWorkflowLayout
      step={6}
      title="Member Preference Submission"
      subtitle="Review and submit your family member's preferences for this trip."
      onBack={() => navigate("/create-trip/5")}
      onNext={() => navigate("/review-member-responses")}
      nextLabel="Next: Review Responses"
      summary={summary}
    >
      <div className="space-y-6">
        <div className="border border-neutral-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Member: Meena</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-600">Destination confirmation</span>
              <span className="font-medium text-neutral-900">Confirm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Preferences</span>
              <span className="font-medium text-neutral-900">Family Time, Nature</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Available dates</span>
              <span className="font-medium text-neutral-900">12–15 January</span>
            </div>
          </div>
        </div>
      </div>
    </TripWorkflowLayout>
  );
};

export default MemberPreferenceSubmission;
