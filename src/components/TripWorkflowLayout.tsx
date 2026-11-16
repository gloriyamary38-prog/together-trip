import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

interface TripWorkflowLayoutProps {
  step: number;
  totalSteps?: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  showNext?: boolean;
  showBack?: boolean;
  nextDisabled?: boolean;
  summary?: ReactNode;
  footerExtra?: ReactNode;
}

const TripWorkflowLayout = ({
  step,
  totalSteps = 6,
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = "Next",
  backLabel = "Back",
  showNext = true,
  showBack = true,
  nextDisabled = false,
  summary,
  footerExtra,
}: TripWorkflowLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <div className="flex-1 p-8 pb-32">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
              Step {step} of {totalSteps}
            </p>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">{title}</h1>
            <p className="text-neutral-600 mb-8">{subtitle}</p>
            {children}
          </div>
        </div>
        {summary && (
          <div className="w-80 border-l border-neutral-200 p-6 bg-white min-h-screen">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4">
              Trip Summary
            </h3>
            {summary}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-8 py-4 flex items-center justify-end gap-3 z-40">
        {footerExtra}
        {showBack && (
          <button
            onClick={onBack || (() => navigate(-1))}
            className="px-5 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            {backLabel}
          </button>
        )}
        {showNext && (
          <button
            onClick={onNext}
            disabled={nextDisabled}
            className="px-5 py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default TripWorkflowLayout;
