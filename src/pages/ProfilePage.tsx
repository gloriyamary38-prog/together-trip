import { UserCircle } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Profile</h1>
        <p className="text-neutral-600">Manage your account and preferences.</p>
      </div>

      <div className="border border-neutral-200 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-neutral-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Priya S.</h2>
            <p className="text-sm text-neutral-500">Trip Owner</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
            <input
              type="text"
              value="Priya S."
              readOnly
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm text-neutral-900 bg-neutral-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
            <input
              type="email"
              value="priya@example.com"
              readOnly
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm text-neutral-900 bg-neutral-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Role</label>
            <input
              type="text"
              value="Trip Owner"
              readOnly
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm text-neutral-900 bg-neutral-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;