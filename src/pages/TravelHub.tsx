import { Link } from "react-router-dom";
import { Calendar, FileText, MessageCircle, Zap } from "lucide-react";

const TravelHub = () => {
  const sections = [
    { title: "Confirmed Itinerary", description: "View the finalised trip itinerary.", icon: Calendar, path: "/travel-hub/confirmed-itinerary" },
    { title: "Documents & Tickets", description: "Manage travel documents and tickets.", icon: FileText, path: "/travel-hub/documents" },
    { title: "Group Chat", description: "Chat with your family members.", icon: MessageCircle, path: "/travel-hub/group-chat" },
    { title: "Quick Actions", description: "Quick access to common actions.", icon: Zap, path: "/travel-hub/quick-actions" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Travel Hub</h1>
        <p className="text-neutral-600">Your central hub for all trip-related information and actions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.title}
              to={section.path}
              className="border border-neutral-200 rounded-lg p-6 hover:border-neutral-300 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-neutral-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">{section.title}</h3>
              <p className="text-sm text-neutral-500">{section.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TravelHub;