import { Construction } from "lucide-react";

interface PlaceholderProps {
  title: string;
}

const Placeholder = ({ title }: PlaceholderProps) => {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">{title}</h1>
        <p className="text-neutral-600">This section is part of a later phase.</p>
      </div>
      <div className="border border-neutral-200 rounded-lg p-12 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
          <Construction className="w-6 h-6 text-neutral-500" />
        </div>
        <p className="text-sm font-medium text-neutral-900 mb-1">Coming soon</p>
        <p className="text-sm text-neutral-500 max-w-sm">
          {title} will be available in a future module. The current phase focuses on sign-in, the dashboard and trip creation.
        </p>
      </div>
    </div>
  );
};

export default Placeholder;
