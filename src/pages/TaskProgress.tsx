import { CheckSquare } from "lucide-react";

const TaskProgress = () => {
  const tasks = [
    { title: "Book hotel", progress: 100, status: "Completed" },
    { title: "Plan activities", progress: 50, status: "In Progress" },
    { title: "Arrange transport", progress: 0, status: "Pending" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Task Progress</h1>
        <p className="text-neutral-600">Track the progress of tasks for this trip.</p>
      </div>

      <div className="space-y-6">
        {tasks.map((task, i) => (
          <div key={i} className="border border-neutral-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-neutral-900">{task.title}</h3>
              <span className="px-2.5 py-1 text-xs font-medium border border-neutral-300 rounded text-neutral-700">
                {task.status}
              </span>
            </div>
            <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <div className="h-full bg-neutral-900 rounded-full" style={{ width: `${task.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskProgress;