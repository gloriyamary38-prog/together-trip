import { MessageCircle } from "lucide-react";

const GroupChat = () => {
  const messages = [
    { sender: "Priya", message: "Hey everyone! The trip is confirmed. Let's start planning!", time: "10:30 AM" },
    { sender: "Meena", message: "Great! I'll book the hotel.", time: "10:35 AM" },
    { sender: "Arjun", message: "I'll arrange the transport.", time: "10:40 AM" },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Group Chat</h1>
        <p className="text-neutral-600">Chat with your family members about the trip.</p>
      </div>

      <div className="border border-neutral-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-neutral-600" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-900">Family Trip to Ooty</h2>
        </div>

        <div className="space-y-4 mb-6">
          {messages.map((msg, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-neutral-600">{msg.sender[0]}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-neutral-900">{msg.sender}</span>
                  <span className="text-xs text-neutral-500">{msg.time}</span>
                </div>
                <p className="text-sm text-neutral-700">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 h-10 px-4 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
          <button className="h-10 px-4 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;