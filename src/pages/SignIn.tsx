import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSendOtp = () => {
    navigate("/home");
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="hidden md:flex md:w-1/2 bg-neutral-50 p-12 flex-col justify-center">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 border border-neutral-300 flex items-center justify-center">
            <span className="text-xs font-bold text-neutral-900">TT</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900">TogetherTrip</span>
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-6 leading-tight">
          Travel planning is better together.
        </h1>
        <p className="text-lg text-neutral-600 mb-12 leading-relaxed max-w-md">
          Discover destinations, plan your itinerary, share choices and create memorable family journeys.
        </p>
        <div className="w-full h-64 border-2 border-neutral-200 rounded-lg flex items-center justify-center">
          <span className="text-neutral-400 text-sm">IMAGE PLACEHOLDER</span>
        </div>
        <div className="mt-8 flex items-center gap-2">
          <div className="w-3 h-1.5 bg-neutral-900 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-neutral-400" />
          <div className="w-2 h-2 rounded-full bg-neutral-400" />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome to TogetherTrip</h1>
            <p className="text-neutral-600">
              Sign in to start planning journeys with your family. Choose your preferred sign-in method below.
            </p>
          </div>

          <div className="flex border-b border-neutral-200 mb-8">
            <button
              onClick={() => setMethod("phone")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                method === "phone"
                  ? "text-neutral-900 border-b-2 border-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Phone (OTP)
            </button>
            <button
              onClick={() => setMethod("email")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                method === "email"
                  ? "text-neutral-900 border-b-2 border-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Email
            </button>
          </div>

          {method === "phone" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
                <div className="flex gap-2">
                  <select className="h-10 pl-3 pr-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-900">
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 h-10 pl-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              <button
                onClick={handleSendOtp}
                className="w-full h-10 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Send OTP
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 pl-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <button
                onClick={handleSendOtp}
                className="w-full h-10 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Send Magic Link
              </button>
            </div>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-neutral-500">OR</span>
            </div>
          </div>

          <button className="w-full h-10 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors">
            <div className="w-5 h-5 border border-neutral-300 rounded flex items-center justify-center">
              <span className="text-xs font-bold">G</span>
            </div>
            Continue with Google
          </button>

          <p className="mt-8 text-xs text-neutral-500 text-center leading-relaxed">
            By continuing, you agree to TogetherTrip's Terms of Service and acknowledge the Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
