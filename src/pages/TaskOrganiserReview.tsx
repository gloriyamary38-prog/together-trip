import { CheckSquare } from "lucide-react";

const TaskOrganiserReview = () => {
  const tasks = [
    { title: "Book hotel", status: "Approved" },
    { title: "Plan activities", status: "Pending" },
    { title: "Arrange transport", status: "Pending" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Task Organiser Review</h1>
        <p className="text-neutral-600">Review task assignments as the trip organiser.</p>
      </div>

      <div className="space-y-6">
        {tasks.map((task, i) => (
          <div key={i} className="border border-neutral-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <CheckSquare className="w-5 h-5 text-neutral-600" />
                </div>
                <h3 className="font-semibold text-neutral-900">{task.title}</h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-medium border border-neutral-300 rounded text-neutral-700">
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskOrganiserReview;