import { useParams, useMemo } from "react-router-dom";
import { useTrip } from "@/contexts/TripContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Users, Shield, Calendar, Mail } from "lucide-react";

const InvitationTracking = () => {
  const { currentTrip, invitedMembers, invitations } = useTrip();
  const navigate = useNavigate();
  const { id: tripId } = useParams();

  // Get trip name from currentTrip or params
  const tripName = currentTrip?.name || "Trip";

  // Calculate summary counts from invitations
  const acceptedCount = invitations?.filter(
    (inv) => inv.status === "Accepted"
  ).length || 0;

  const pendingCount = invitations?.filter(
    (inv) => inv.status === "Pending"
  ).length || 0;

  const declinedCount = invitations?.filter(
    (inv) => inv.status === "Declined"
  ).length || 0;

  const peopleInvitedCount = invitedMembers?.length || 0;

  // Get group names from invited members
  const groupNames = useMemo(() => {
    return invitedMembers
      ?.map((member: any) => member.groupName)
      ?.filter(Boolean) || [];
  }, [invitedMembers]);

  const handleSendReminder = () => {
    toast({
      title: "Reminder Sent",
      description: `Reminder sent to pending members for ${tripName}`,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-neutral-900">
            Invitations Sent Successfully
          </h1>
          <button
            onClick={() => navigate("/trips")}
            className="text-sm text-neutral-500 hover underline"
          >
            Back to Trips
          </button>
        </div>

        <p className="text-neutral-600 mb-8">
          Invitations were sent for {tripName}. Your family members can now review
          the proposed destination and dates.
        </div>

        {/* People Invited Card */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mb-6">
          <h3 className="text-sm font-medium text-neutral-500 mb-2">
            People Invited
          </h3>
          <p className="text-3xl font-bold text-neutral-900">
            {peopleInvitedCount}
          </p>
          <p className="text-sm text-neutral-500">
            family members and friends invited
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <p className="text-xs font-medium text-neutral-500">Accepted</p>
            <p className="text-2xl font-bold text-neutral-900">{acceptedCount}</p>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <p className="text-xs font-medium text-neutral-500">Pending</p>
            <p className="text-2xl font-bold text-neutral-900">{pendingCount}</p>
          </div>
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <p className="text-xs font-medium text-neutral-500">Declined</p>
            <p className="text-2xl font-bold text-neutral-900">{declinedCount}</p>
          </div>
        </div>

        {/* Invitation Status Table */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 mb-8">
          <h3 className="text-sm font-medium text-neutral-500 mb-4">
            Invitation Status
          </h3>
          {invitations?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left text-neutral-500 py-2">Member Name</th>
                    <th className="text-left text-neutral-500 py-2">Contact</th>
                    <th className="text-left text-neutral-500 py-2">Status</th>
                    <th className="text-left text-neutral-500 py-2">Date Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {invitations?.map((invitation: any, index: number) => (
                    <tr key={index} className="border-b border-neutral-200">
                      <td className="py-2">
                        <p className="font-medium text-neutral-900">
                          {invitation.member || "—"}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {invitation.groupName || "—"}
                        </p>
                      </td>
                      <td className="py-2">
                        <p className="font-medium text-neutral-900">
                          {invitation.phone || "—"}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {invitation.email || "—"}
                        </p>
                      </td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            invitation.status === "Accepted"
                              ? "bg-neutral-100 text-neutral-800"
                              : invitation.status === "Declined"
                                ? "bg-red-50 text-red-600"
                                : "bg-neutral-100 text-neutral-800"
                          }`}
                        >
                          {invitation.status || "Pending"}
                        </span>
                      </td>
                      <td className="py-2">
                        <p className="text-xs text-neutral-500">
                          {invitation.sentAt ? new Date(invitation.sentAt).toLocaleDateString() : "—"}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-neutral-500 text-center py-8">
              No invitations recorded yet
            </p>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex gap-3 pt-8 border-t border-neutral-200">
          <button
            onClick={() => navigate("/trips")}
            className="flex-1 px-4 h-10 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Back to My Trips
          </button>
          <button
            onClick={handleSendReminder}
            className="flex-1 px-4 h-10 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Send Reminder
          </button>
          <button
            onClick={() => navigate(`/trips/${tripId}`)}
            className="flex-1 px-4 h-10 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Go to Trip Workspace
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationTracking;