import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Settings</h1>
        <p className="text-neutral-600">Manage your account and preferences.</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-neutral-600" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Account Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
            <input
              type="text"
              value="John Doe"
              readOnly
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm text-neutral-900 bg-neutral-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
            <input
              type="email"
              value="john.doe@example.com"
              readOnly
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm text-neutral-900 bg-neutral-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Role</label>
            <input
              type="text"
              value="Family Admin"
              readOnly
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg text-sm text-neutral-900 bg-neutral-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
