import { useNavigate } from "react-router-dom";
import TripWorkflowLayout from "@/components/TripWorkflowLayout";

const ReviewMemberResponses = () => {
  const navigate = useNavigate();

  const summary = (
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-xs text-neutral-500 mb-1">Trip name</p>
        <p className="font-medium text-neutral-900">Family Trip to Ooty</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Responses</p>
        <p className="font-medium text-neutral-900">3 submitted</p>
      </div>
    </div>
  );

  return (
    <TripWorkflowLayout
      step={7}
      title="Review Member Responses"
      subtitle="Review the responses from your family members before finalising the trip."
      onBack={() => navigate("/member-preference-submission")}
      onNext={() => navigate("/trip-confirmation")}
      nextLabel="Finalise Trip"
      summary={summary}
    >
      <div className="space-y-6">
        <div className="border border-neutral-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Member Responses</h3>
          <div className="space-y-2">
            {["Meena", "Arjun", "Karthik"].map((name) => (
              <div key={name} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                <span className="text-sm text-neutral-900">{name}</span>
                <span className="px-2.5 py-1 text-xs font-medium border border-neutral-300 rounded text-neutral-700">
                  Submitted
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TripWorkflowLayout>
  );
};

export default ReviewMemberResponses;
