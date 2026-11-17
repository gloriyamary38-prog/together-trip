import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTrip } from "@/contexts/TripContext";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthenticated } = useTrip();

  // Generate a random 6-digit OTP
  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  };

  // Store OTP in session storage and retrieve it
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [displayOtp, setDisplayOtp] = useState<string | null>(null);

  // On mount, check if there's an OTP in session storage (from resend)
  useEffect(() => {
    const storedOtp = sessionStorage.getItem("togethertrip_otp");
    if (storedOtp) {
      setGeneratedOtp(storedOtp);
      setDisplayOtp(storedOtp);
    } else {
      // Generate a new OTP when component mounts
      const newOtp = generateOtp();
      setGeneratedOtp(newOtp);
      setDisplayOtp(newOtp);
      // Store in session storage for this session
      try {
        sessionStorage.setItem("togethertrip_otp", newOtp);
      } catch (e) {
        console.error("Failed to store OTP in sessionStorage", e);
      }
    }
  }, []);

  // Clean up session storage on unmount
  useEffect(() => {
    return () => {
      try {
        sessionStorage.removeItem("togethertrip_otp");
      } catch (e) {
        console.error("Failed to clear OTP from sessionStorage", e);
      }
    };
  }, []);

  // Phone number from location state or default
  const phone = (location.state as { phone?: string })?.phone || "+91 98765 43210";

  // Single source of truth for the entered OTP
  const [otpValue, setOtpValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Accept only numeric digits, max 6
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtpValue(value);
    setError("");
  }, []);

  // Paste: strip non-digits and limit to 6
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    setOtpValue(pasted);
    setError("");
  }, []);

  const handleVerify = useCallback(() => {
    if (otpValue === generatedOtp) {
      setSuccess(true);
      setAuthenticated(true);
      setTimeout(() => navigate("/home"), 600);
    } else if (!otpValue) {
      setError("Please enter the OTP.");
    } else {
      setError("Incorrect OTP. Please try again.");
    }
  }, [otpValue, generatedOtp, setAuthenticated, navigate]);

  const handleResend = useCallback(() => {
    const newOtp = generateOtp();
    setGeneratedOtp(newOtp);
    setDisplayOtp(newOtp);
    setOtpValue("");
    setError("");
    try {
      sessionStorage.setItem("togethertrip_otp", newOtp);
    } catch (e) {
      console.error("Failed to store new OTP in sessionStorage", e);
    }
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <div className="hidden md:flex md:w-1/2 bg-neutral-50 p-12 flex-col justify-center">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 border border-neutral-300 flex items-center justify-center">
            <span className="text-xs font-bold text-neutral-900">TT</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900">
            TogetherTrip
          </span>
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
            <ArrowLeft className="w-4 h-4" />Back to sign in
          </button>

          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Verify your number</h1>
          <p className="text-neutral-600 mb-8">
            We've sent a 6-digit code to <span className="font-medium text-neutral-900">
              {phone}
            </span>. Enter it below to continue.
          </p>

          {/* Single visible OTP input */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            maxLength={6}
            autoComplete="one-time-code"
            placeholder="Enter 6-digit OTP"
            value={otpValue}
            onChange={handleChange}
            onPaste={handlePaste}
            className={`w-full h-12 px-4 text-center text-lg font-semibold tracking-widest border rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 mb-4 ${
              error ? "border-red-400" : "border-neutral-300"
            }`}
            aria-label="OTP code"
          />

          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          {success && <p className="text-sm text-green-700 mb-4">Verified! Redirecting to your dashboard…</p>}

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 mb-6">
            <p className="text-xs text-neutral-600">
              <span className="font-medium text-neutral-900">Demo mode:</span> No real SMS is sent. Use the code{" "}
              <span className="font-mono font-semibold text-neutral-900">{displayOtp}</span> to continue.
            </p>
          </div>

          <button
            onClick={handleVerify}
            disabled={otpValue.length !== 6 || success}
            className="w-full h-10 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Verify & Continue
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