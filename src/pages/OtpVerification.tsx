import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTrip } from "@/contexts/TripContext";

const DEMO_OTP = "123456";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthenticated } = useTrip();
  const phone = (location.state as { phone?: string })?.phone || "+91 98765 43210";

  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError("");
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = digits.join("");
    if (code === DEMO_OTP) {
      setSuccess(true);
      setAuthenticated(true);
      setTimeout(() => navigate("/home"), 600);
    } else {
      setError("Incorrect OTP. Please enter the demo code 123456.");
    }
  };

  const handleResend = () => {
    setDigits(["", "", "", "", "", ""]);
    setError("");
    inputsRef.current[0]?.focus();
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
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate("/sign-in")}
            className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </button>

          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Verify your number</h1>
          <p className="text-neutral-600 mb-8">
            We've sent a 6-digit code to <span className="font-medium text-neutral-900">{phone}</span>.
            Enter it below to continue.
          </p>

          <div className="flex gap-2 mb-4">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-full h-12 text-center text-lg font-semibold border rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 ${
                  error ? "border-red-400" : "border-neutral-300"
                }`}
              />
            ))}
          </div>

          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          {success && <p className="text-sm text-green-700 mb-4">Verified! Redirecting to your dashboard…</p>}

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 mb-6">
            <p className="text-xs text-neutral-600">
              <span className="font-medium text-neutral-900">Demo mode:</span> No real SMS is sent. Use the code{" "}
              <span className="font-mono font-semibold text-neutral-900">123456</span> to continue.
            </p>
          </div>

          <button
            onClick={handleVerify}
            disabled={digits.some((d) => !d) || success}
            className="w-full h-10 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Verify &amp; Continue
          </button>

          <button
            onClick={handleResend}
            className="w-full mt-3 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Resend code
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
