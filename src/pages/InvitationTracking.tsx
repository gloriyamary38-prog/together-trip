import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Users,
} from "lucide-react";
import { useTrip } from "@/contexts/TripContext";

type InvitationItem = {
  id: string;
  member: string;
  phone?: string;
  email?: string;
  status: "Pending" | "Accepted" | "Declined";
  sentAt?: string;
  groupName?: string;
};

const formatDate = (date?: string) => {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const InvitationTracking = () => {
  const { id } = useParams<{ id: string }>();
  const { trips } = useTrip();

  const [reminderMessage, setReminderMessage] = useState("");

  const trip = trips.find((item) => item.id === id);

  // Use only trip.invitations as the data source to avoid duplicates
  // If no invitations exist, fall back to trip.invitedMembers
  const allInvitations: InvitationItem[] = useMemo(() => {
    if (!trip) return [];

    // First try trip.invitations
    if (trip.invitations && trip.invitations.length > 0) {
      return trip.invitations.map((invitation) => ({
        id: invitation.id,
        member: invitation.member,
        phone: invitation.phone,
        email: invitation.email,
        status: invitation.status,
        sentAt: invitation.sentAt,
        groupName: invitation.groupName,
      }));
    }

    // Fall back to trip.invitedMembers
    return (trip.invitedMembers || []).map((member) => ({
      id: member.id,
      member: member.name,
      phone: member.phone,
      email: member.email,
      status: "Pending",
      sentAt: trip.invitationsSentAt,
      groupName: member.groupName,
    }));
  }, [trip]);

  const acceptedCount = allInvitations.filter(
    (item) => item.status === "Accepted"
  ).length;

  const pendingCount = allInvitations.filter(
    (item) => item.status === "Pending"
  ).length;

  const declinedCount = allInvitations.filter(
    (item) => item.status === "Declined"
  ).length;

  const totalInvitedCount = allInvitations.length;

  const handleSendReminder = () => {
    setReminderMessage(
      "Reminder simulated successfully. No actual message was sent."
    );

    window.setTimeout(() => {
      setReminderMessage("");
    }, 4000);
  };

  if (!trip) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">
          Trip not found
        </h2>

        <p className="text-sm text-neutral-500 mb-5">
          We could not find this trip. Please return to your trips.
        </p>

        <Link
          to="/trips"
          className="inline-flex items-center gap-2 text-sm font-medium underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Trips
        </Link>
      </div>
    );
  }

  const destinations =
    trip.proposedDestinations?.length > 0
      ? trip.proposedDestinations.join(", ")
      : trip.destination || "Destination not selected";

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Link
          to="/trips"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 mb-5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Trips
        </Link>

        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Invitations Sent Successfully
            </h1>

            <p className="text-sm text-neutral-500 mt-1">
              Your trip invitations have been recorded.
            </p>
          </div>
        </div>
      </div>

      {/* Trip Summary */}
      <section className="rounded-xl border border-neutral-200 p-5">
        <h2 className="text-base font-semibold text-neutral-900 mb-4">
          Trip Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-neutral-500 mt-0.5" />
            <div>
              <p className="text-xs text-neutral-500">Destination</p>
              <p className="text-sm font-medium text-neutral-900">
                {destinations}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarDays className="w-5 h-5 text-neutral-500 mt-0.5" />
            <div>
              <p className="text-xs text-neutral-500">Travel Dates</p>
              <p className="text-sm font-medium text-neutral-900">
                {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-neutral-500 mt-0.5" />
            <div>
              <p className="text-xs text-neutral-500">Total Invited</p>
              <p className="text-sm font-medium text-neutral-900">
                {totalInvitedCount} members
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Invitation Statistics */}
      <section className="mb-6">
        <h2 className="text-base font-semibold text-neutral-900 mb-3">
          Invitation Overview
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="text-xs text-neutral-500 mb-2">Invited</p>
            <p className="text-2xl font-bold text-neutral-900">
              {totalInvitedCount}
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="text-xs text-neutral-500 mb-2">Accepted</p>
            <p className="text-2xl font-bold text-green-600">
              {acceptedCount}
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="text-xs text-neutral-500 mb-2">Pending</p>
            <p className="text-2xl font-bold text-amber-600">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="text-xs text-neutral-500 mb-2">Declined</p>
            <p className="text-2xl font-bold text-red-600">
              {declinedCount}
            </p>
          </div>
        </div>
      </section>

      {/* People Invited */}
      <section className="rounded-xl border border-neutral-200 overflow-hidden">
        <div className="p-5 border-b border-neutral-200">
          <h2 className="text-base font-semibold text-neutral-900">
            People Invited
          </h2>

          <p className="text-sm text-neutral-500 mt-1">
            Track the responses of your invited members.
          </p>
        </div>

        {allInvitations.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="w-8 h-8 text-neutral-300 mx-auto mb-3" />

            <p className="text-sm font-medium text-neutral-800">
              No invitations found
            </p>

            <p className="text-sm text-neutral-500 mt-1">
              No members were recorded for this trip.
            </p>
          </div>
        ) : (
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-50 text-neutral-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Member Name</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date Sent</th>
                </tr>
              </thead>

              <tbody>
                {allInvitations.map((invitation) => (
                  <tr
                    key={invitation.id}
                    className="border-b border-neutral-100"
                  >
                    <td className="px-4 py-4">
                      <p className="font-medium text-neutral-900">
                        {invitation.member}
                      </p>

                      {invitation.groupName && (
                        <p className="text-xs text-neutral-500 mt-1">
                          {invitation.groupName}
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-4 text-neutral-600">
                      {invitation.phone ||
                        invitation.email ||
                        "Not provided"}
                    </td>

                    <td className="px-4 py-4">
                      {invitation.status === "Accepted" ? (
                        <span className="inline-flex items-center gap-1 text-green-700">
                          <CheckCircle2 className="w-4 h-4" /> Accepted
                        </span>
                      ) : invitation.status === "Declined" ? (
                        <span className="inline-flex items-center gap-1 text-red-700">
                          <XCircle className="w-4 h-4" /> Declined
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700">
                          <Clock className="w-4 h-4" /> Pending
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-4 text-neutral-600">
                      {formatDate(invitation.sentAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Reminder Feedback */}
      {reminderMessage && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
          {reminderMessage}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Link
          to="/trips"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          <ArrowLeft className="w-4 h-4" /> Back to My Trips
        </Link>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleSendReminder}
            disabled={pendingCount === 0}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageCircle className="w-4 h-4" /> Send Reminder
          </button>

          <Link
            to={`/trips/${trip.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Go to Trip Workspace
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <p className="text-xs text-neutral-400">
        Prototype demonstration: invitation reminders are simulated. No
        external messages are sent.
      </p>
    </div>
  );
};

export default InvitationTracking;