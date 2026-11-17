import { Compass } from "lucide-react";

const Experiences = () => {
  const experiences = [
    { title: "Heritage Walk", category: "Culture", location: "Ooty" },
    { title: "Nature Trek", category: "Adventure", location: "Munnar" },
    { title: "Beach Day", category: "Relaxation", location: "Goa" },
    { title: "Food Trail", category: "Food & Local Experiences", location: "Kerala" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Experiences</h1>
        <p className="text-neutral-600">Explore activities and interests for your family.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((experience) => (
          <div key={experience.title} className="border border-neutral-200 rounded-lg p-6">
            <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center mb-4">
              <Compass className="w-5 h-5 text-neutral-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-1">{experience.title}</h3>
            <p className="text-sm text-neutral-500">{experience.category}</p>
            <p className="text-sm text-neutral-600 mt-1">Location: {experience.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;
