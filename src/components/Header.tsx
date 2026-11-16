import { Link } from "react-router-dom";
import { Bell, HelpCircle, Search, UserCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-200 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 border border-neutral-300 flex items-center justify-center">
            <span className="text-xs font-bold text-neutral-900">TT</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900">TogetherTrip</span>
        </Link>
      </div>
      <div className="flex-1 max-w-md mx-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search trips, members and places..."
            className="w-full h-10 pl-10 pr-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-neutral-200">
          <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
            <span className="text-xs font-medium text-neutral-600">PS</span>
          </div>
          <span className="text-sm font-medium text-neutral-900 hidden sm:block">Priya S.</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
