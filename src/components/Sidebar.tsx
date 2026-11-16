import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Home,
  Map,
  Plus,
  Settings,
  Users,
  Wallet,
} from "lucide-react";

const navItems = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/trips", label: "My Trips", icon: Map },
  { path: "/create-trip", label: "Create Trip", icon: Plus },
  { path: "/family", label: "My Family", icon: Users },
  { path: "/groups", label: "Groups", icon: Users },
  { path: "/itinerary", label: "Itinerary", icon: Calendar },
  { path: "/budget", label: "Budget", icon: Wallet },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-neutral-200 flex flex-col z-40">
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-neutral-200">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
