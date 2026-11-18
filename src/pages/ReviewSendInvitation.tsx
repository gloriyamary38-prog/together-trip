
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Users,
  Plane,
  ShieldCheck,
  Eye,
  Pencil,
  Mail,
} from "lucide-react";

import TripWorkflowLayout from "@/components/TripWorkflowLayout";
import { useTrip } from "@/contexts/TripContext";

const ReviewSendInvitation = () => {
  const navigate = useNavigate();
  const tripContext = useTrip() as any;

  const currentTrip = tripContext.currentTrip;
  const updateTrip = tripContext.updateTrip;

  const [message, setMessage] = useState(
    "Hi! I'm planning a trip. Please review the proposed destination and dates, and share your preferences so we can finalise the plan together."
  );

  const [sendError, setSendError] = useState("");

  const destinations =
    currentTrip?.proposedDestinations ||
    currentTrip?.destinations ||
    [];

  const invitedMembers = currentTrip?.invitedMembers || [];
  const familyMembers = currentTrip?.familyMembers || [];

  const groupNames = useMemo(
    () => [
      ...new Set(
        invitedMembers
          .map((member: any) => member.groupName)
          .filter(Boolean)
      ),
    ],
    [invitedMembers]
  );

  const totalTravellers = 1 + familyMembers.length + invitedMembers.length;

  const handleSendInvitation = () => {
    if (!currentTrip?.id) {
      setSendError("Trip details are missing. Please return to the trip creation screen.");
      return;
    }

    const invitations = invitedMembers.map((member: any) => ({
      id: member.id,
      member: member.name,
      phone: member.phone || "",
      email: member.email || "",
      source: member.source || "individual",
      groupId: member.groupId,
      groupName: member.groupName,
      access: member.access || "View Only",
      status: "Pending",
      message,
      sentAt: new Date().toISOString(),
    }));

    updateTrip(currentTrip.id, {
      invitedMembers,
      invitations,
      invitationMessage: message,
      invitationStatus: "Sent",
      invitationsSentAt: new Date().toISOString(),
      status: "Planning",
    });

    navigate("/invitation-sent");
  };

  const tripSummary = (
    <div className="space-y-4 text-sm">
      <h3 className="font-semibold text-neutral-900">Trip Summary</h3>

      <div>
        <p className="text-neutral-500">Trip Name</p>
        <p className="font-medium">{currentTrip?.name || "—"}</p>
      </div>

      <div>
        <p className="text-neutral-500">Destinations</p>
        <p className="font-medium">
          {destinations.length > 0
            ? destinations.join(", ")
            : currentTrip?.destination || "—"}
        </p>
      </div>

      <div>
        <p className="text-neutral-500">Other Members</p>
        <p className="font-medium">{invitedMembers.length}</p>
      </div>

      <div>
        <p className="text-neutral-500">Total Travellers</p>
        <p className="font-medium">{totalTravellers}</p>
      </div>
    </div>
  );

  return (
    <TripWorkflowLayout
      step={4}
      title="Review & Send Invitation"
      subtitle="Check the trip details and invited members before sending."
      onBack={() => navigate("/create-trip/3")}
      onNext={handleSendInvitation}
      nextLabel="Send Invitation"
      summary={tripSummary}
    >
      <div className="space-y-6">
        {/* Trip Details */}
        <section className="rounded-xl border border-neutral-200 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Plane className="h-5 w-5 text-neutral-600" />
            <h3 className="font-semibold text-neutral-900">Trip Details</h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs text-neutral-500">Trip Name</p>
              <p className="font-medium">{currentTrip?.name || "—"}</p>
            </div>

            <div>
              <p className="mb-1 text-xs text-neutral-500">Trip Type</p>
              <p className="font-medium">{currentTrip?.tripType || "—"}</p>
            </div>

            <div>
              <p className="mb-1 flex items-center gap-1 text-xs text-neutral-500">
                <CalendarDays className="h-3.5 w-3.5" />
                Tentative Dates
              </p>
              <p className="font-medium">
                {currentTrip?.startDate || "—"} – {currentTrip?.endDate || "—"}
              </p>
            </div>

            <div>
              <p className="mb-1 flex items-center gap-1 text-xs text-neutral-500">
                <MapPin className="h-3.5 w-3.5" />
                Proposed Destinations
              </p>
              <p className="font-medium">
                {destinations.length > 0
                  ? destinations.join(", ")
                  : currentTrip?.destination || "—"}
              </p>
            </div>
          </div>

          {currentTrip?.purpose && (
            <div className="mt-5 border-t border-neutral-100 pt-4">
              <p className="mb-1 text-xs text-neutral-500">Trip Purpose</p>
              <p className="font-medium">{currentTrip.purpose}</p>
            </div>
          )}

          {currentTrip?.preferences?.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs text-neutral-500">Trip Preferences</p>
              <div className="flex flex-wrap gap-2">
                {currentTrip.preferences.map((preference: string) => (
                  <span
                    key={preference}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700"
                  >
                    {preference}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Family */}
        <section className="rounded-xl border border-neutral-200 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-neutral-600" />
            <h3 className="font-semibold text-neutral-900">
              My Family ({familyMembers.length})
            </h3>
          </div>

          {familyMembers.length === 0 ? (
            <p className="text-sm text-neutral-500">
              No additional family members added.
            </p>
          ) : (
            <div className="space-y-2">
              {familyMembers.map((member: any, index: number) => (
                <div
                  key={member.id || index}
                  className="rounded-lg bg-neutral-50 px-3 py-2 text-sm"
                >
                  <span className="font-medium">
                    {member.name || member.fullName || "Family Member"}
                  </span>
                  {member.age ? (
                    <span className="ml-2 text-neutral-500">
                      {member.age} years
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Other Members */}
        <section className="rounded-xl border border-neutral-200 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-neutral-600" />
            <h3 className="font-semibold text-neutral-900">
              Other Members ({invitedMembers.length})
            </h3>
          </div>

          {invitedMembers.length === 0 ? (
            <p className="text-sm text-neutral-500">
              No other members have been invited.
            </p>
          ) : (
            <div className="space-y-3">
              {invitedMembers.map((member: any) => (
                <div
                  key={member.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-neutral-200 p-3"
                >
                  <div>
                    <p className="font-medium text-neutral-900">
                      {member.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {member.phone || member.email || "Contact not provided"}
                      {member.groupName ? ` · ${member.groupName}` : ""}
                    </p>
                  </div>

                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
                    {member.access || "View Only"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Groups */}
        {groupNames.length > 0 && (
          <section className="rounded-xl border border-neutral-200 p-5">
            <h3 className="mb-3 font-semibold text-neutral-900">
              Groups Included
            </h3>
            <div className="flex flex-wrap gap-2">
              {groupNames.map((name: string) => (
                <span
                  key={name}
                  className="rounded-full bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700"
                >
                  {name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Access Summary */}
        <section className="rounded-xl border border-neutral-200 p-5">
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-neutral-600" />
            <h3 className="font-semibold text-neutral-900">
              Member Access Summary
            </h3>
          </div>

          <p className="mb-4 text-sm text-neutral-500">
            These permissions are inherited from the saved group settings.
            They cannot be changed on this screen.
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Pencil className="h-4 w-4 text-neutral-600" />
              <span>
                Edit Access: Members can contribute and edit permitted trip information.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-neutral-600" />
              <span>
                View Only: Members can view permitted trip information.
              </span>
            </div>
          </div>
        </section>

        {/* Invitation Message */}
        <section className="rounded-xl border border-neutral-200 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Mail className="h-5 w-5 text-neutral-600" />
            <h3 className="font-semibold text-neutral-900">
              Invitation Message
            </h3>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full resize-y rounded-lg border border-neutral-300 p-3 text-sm outline-none focus:border-neutral-900"
            placeholder="Write an invitation message..."
          />
        </section>

        {sendError && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {sendError}
          </p>
        )}

        <div className="flex items-start gap-2 text-xs text-neutral-500">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Review the trip information and member access before sending.
            Sending this invitation will mark the invitations as Pending.
          </p>
        </div>
      </div>
    </TripWorkflowLayout>
  );
};

export default ReviewSendInvitation;
