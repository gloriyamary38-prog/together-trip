import { FileText } from "lucide-react";

const DocumentsTickets = () => {
  const documents = [
    { name: "Hotel Booking Confirmation", type: "PDF", date: "12 Jan 2025" },
    { name: "Flight Tickets", type: "PDF", date: "10 Jan 2025" },
    { name: "Travel Insurance", type: "PDF", date: "08 Jan 2025" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Documents &amp; Tickets</h1>
        <p className="text-neutral-600">Manage all your travel documents and tickets in one place.</p>
      </div>

      <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200">
        {documents.map((doc) => (
          <div key={doc.name} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-neutral-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">{doc.name}</p>
                <p className="text-xs text-neutral-500">{doc.type} · {doc.date}</p>
              </div>
            </div>
            <button className="text-sm text-neutral-600 hover:text-neutral-900 underline">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsTickets;