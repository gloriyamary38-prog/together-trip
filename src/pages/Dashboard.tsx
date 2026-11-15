import { Link } from "react-router-dom";
import { Plus, Calendar, Users, MapPin } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Dashboard</h1>
        <p className="text-neutral-600">Welcome back! Here's what's happening with your family trips.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Active Trips</p>
              <p className="text-2xl font-bold text-neutral-900">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Family Members</p>
              <p className="text-2xl font-bold text-neutral-900">6</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-neutral-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Next Trip</p>
              <p className="text-2xl font-bold text-neutral-900">12 days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-900">Upcoming Trips</h2>
          <Link
            to="/trips"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            View all trips
          </Link>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-neutral-600" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900">Summer Vacation 2024</h3>
                <p className="text-sm text-neutral-500">Barcelona, Spain · Jul 15 - Jul 22</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-600 rounded-full">
                Planning
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-neutral-600" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900">Family Reunion</h3>
                <p className="text-sm text-neutral-500">Lake Tahoe, CA · Aug 5 - Aug 10</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-600 rounded-full">
                Booked
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-neutral-600">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-neutral-900">
                <span className="font-medium">John Doe</span> added a new activity to Summer Vacation 2024
              </p>
              <p className="text-xs text-neutral-500 mt-1">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-neutral-600">SM</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-neutral-900">
                <span className="font-medium">Sarah Miller</span> uploaded documents for Family Reunion
              </p>
              <p className="text-xs text-neutral-500 mt-1">Yesterday</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/trips"
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Plan a new trip
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
