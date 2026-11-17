import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const QuickActions = () => {
  const actions = [
    { title: "View Itinerary", path: "/travel-hub/confirmed-itinerary" },
    { title: "View Documents", path: "/travel-hub/documents" },
    { title: "Open Group Chat", path: "/travel-hub/group-chat" },
    { title: "View Budget", path: "/budget" },
    { title: "View Tasks", path: "/tasks/my-tasks" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Quick Actions</h1>
        <p className="text-neutral-600">Quick access to common trip actions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.path}
            className="border border-neutral-200 rounded-lg p-6 hover:border-neutral-300 transition-colors"
          >
            <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-neutral-600" />
            </div>
            <h3 className="font-semibold text-neutral-900">{action.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;