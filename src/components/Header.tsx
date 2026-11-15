import { Link } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-200 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold tracking-tight text-neutral-900">
          TogetherTrip
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/trips"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            My Trips
          </Link>
          <Link
            to="/family"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Family
          </Link>
          <Link
            to="/settings"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Settings
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
