import { CheckSquare } from "lucide-react";

const AssignResponsibilities = () => {
  const tasks = [
    { title: "Book hotel", assignee: "Priya", status: "Pending" },
    { title: "Plan activities", assignee: "Meena", status: "Pending" },
    { title: "Arrange transport", assignee: "Arjun", status: "Pending" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Assign Responsibilities</h1>
        <p className="text-neutral-600">Assign tasks to family members for this trip.</p>
      </div>

      <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-neutral-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">{task.title}</p>
                <p className="text-xs text-neutral-500">Assigned to {task.assignee}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 text-xs font-medium border border-neutral-300 rounded text-neutral-700">
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignResponsibilities;