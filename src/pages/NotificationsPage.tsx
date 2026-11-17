import { Bell } from "lucide-react";

const NotificationsPage = () => {
  const notifications = [
    { title: "Trip Invitation", message: "You have been invited to join a family trip to Ooty.", time: "2 hours ago" },
    { title: "Member Response", message: "Meena has submitted their trip preferences.", time: "5 hours ago" },
    { title: "Budget Update", message: "The trip budget has been finalised.", time: "1 day ago" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Notifications</h1>
        <p className="text-neutral-600">View your recent notifications.</p>
      </div>

      <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200">
        {notifications.map((notification, i) => (
          <div key={i} className="flex items-start gap-3 p-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-neutral-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-neutral-900">{notification.title}</h3>
              <p className="text-sm text-neutral-600">{notification.message}</p>
              <p className="text-xs text-neutral-500 mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;