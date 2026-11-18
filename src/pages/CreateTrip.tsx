import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import TripWorkflowLayout from "@/components/TripWorkflowLayout";
import { useTrip } from "@/contexts/TripContext";

const tripTypes = ["Family", "Friends", "Group", "Others"];

const CreateTrip = () => {
  const navigate = useNavigate();
  const { currentTrip, createTrip, updateTrip } = useTrip();

  const [name, setName] = useState(currentTrip?.name || "");
  const [startDate, setStartDate] = useState(currentTrip?.startDate || "");
  const [endDate, setEndDate] = useState(currentTrip?.endDate || "");
  const [destination, setDestination] = useState(currentTrip?.destination || "");
  const [tripType, setTripType] = useState(currentTrip?.tripType || "Family");
  const [purpose, setPurpose] = useState(currentTrip?.purpose || "");

  // Proposed destinations state - stores all added destinations as chips
  const [proposedDestinations, setProposedDestinations] = useState<
    string[]
  >(currentTrip?.proposedDestinations || []);

  const handleNext = () => {
    // Combine proposed destinations with the single destination field
    // Use the first destination as the primary, or combine all
    const allDestinations = [...proposedDestinations, destination].filter(
      (d) => d.trim()
    );
    const data = {
      name,
      startDate,
      endDate,
      destination: allDestinations[0] || "",
      tripType,
      purpose,
      // Store all proposed destinations as a comma-separated string
      // We'll use destination field for the first one and add proposedDestinations note
    };
    if (currentTrip) {
      updateTrip(currentTrip.id, data);
    } else {
      createTrip(data);
    }
    navigate("/create-trip/2");
  };

  const handleSaveDraft = () => {
    const allDestinations = [...proposedDestinations, destination].filter(
      (d) => d.trim()
    );
    const data = {
      name,
      startDate,
      endDate,
      destination: allDestinations[0] || "",
      tripType,
      purpose,
      status: "Draft" as const,
    };
    if (currentTrip) {
      updateTrip(currentTrip.id, data);
    } else {
      createTrip(data);
    }
    navigate("/home");
  };

  // Handle input change for the proposed destination field
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  // Add destination to the proposed list
  const addDestination = (e: React.FormEvent) => {
    e.preventDefault();
    const value = destination.trim();

    // Prevent empty or whitespace-only
    if (!value) {
      return;
    }

    // Prevent duplicates (case-insensitive, trimmed)
    const normalizedValue = value.toLowerCase().trim();
    const exists = proposedDestinations.some(
      (d) => d.toLowerCase().trim() === normalizedValue
    );

    if (exists) {
      return; // Duplicate, do not add
    }

    // Add to proposed destinations
    setProposedDestinations([...proposedDestinations, value]);

    // Clear the input field
    setDestination("");
  };

  // Remove a destination from the proposed list
  const removeDestination = (index: number) => {
    setProposedDestinations(proposedDestinations.filter((_, i) => i !== index));
  };

  // Handle Enter key to add destination
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addDestination(e);
    }
  };

  const summary = (
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-xs text-neutral-500 mb-1">Trip name</p>
        <p className="font-medium text-neutral-900">{name || "—"}</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Tentative dates</p>
        <p className="font-medium text-neutral-900">
          {startDate || endDate ? `${startDate || "—"} – ${endDate || "—"}` : "—"}
        </p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Destination</p>
        <p className="font-medium text-neutral-900">
          {destination || "—"}
        </p>
        {proposedDestinations.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-neutral-500 mb-1">Proposed destinations</p>
            <div className="flex gap-1">
              {proposedDestinations.map((dest, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-0.5 px-2 py-1 text-xs border border-neutral-300 rounded-lg background-neutral-50"
                >
                  {dest}
                  <button
                    onClick={() => removeDestination(i)}
                    className="ml-1 text-neutral-500 hover:text-neutral-700 text-xs"
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Trip owner</p>
        <p className="font-medium text-neutral-900">Priya</p>
      </div>
      <div>
        <p className="text-xs text-neutral-500 mb-1">Family members</p>
        <p className="font-medium text-neutral-900">
          {currentTrip?.familyMembers.length || 4}
        </p>
      </div>
    </div>
  );

  return (
    <TripWorkflowLayout
      step={1}
      title="Create a Trip"
      subtitle="Enter the initial details for your family trip."
      onNext={handleNext}
      nextLabel="Next: My Family & Preferences"
      nextDisabled={!name.trim()}
      summary={summary}
      footerExtra={
        <button
          onClick={handleSaveDraft}
          className="px-5 py-2.5 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
        >
          Save as Draft
        </button>
      }
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Trip Name <span className="text-neutral-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Family Trip to Ooty"
            className="w-full h-11 px-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Tentative Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full h-11 px-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Tentative End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full h-11 px-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Proposed Destination
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Ooty"
              className="flex-1 h-11 px-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
            <button
              type="button"
              onClick={addDestination}
              className="inline-flex items-center gap-1 px-4 h-11 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add destination
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Trip Type
          </div>
          <div className="flex flex-wrap gap-6">
            {tripTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tripType"
                  value={type}
                  checked={tripType === type}
                  onChange={() => setTripType(type)}
                  className="w-4 h-4 accent-neutral-900"
                />
                <span className="text-sm text-neutral-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Trip Purpose (optional)
          </label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g. A relaxing family break in the hills"
            rows={4}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-none"
          />
        </div>
      </div>
    </TripWorkflowLayout>
  );
};

export default CreateTrip;