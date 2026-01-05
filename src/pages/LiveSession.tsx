import { useState } from 'react';
import { Mic, Video, Monitor, Square, MessageSquare, User, Code2 } from 'lucide-react';

interface LiveSessionProps {
  onNavigate: (page: string) => void;
}

export default function LiveSession({ onNavigate }: LiveSessionProps) {
  const [messages, setMessages] = useState([
    { sender: 'student', text: 'Hi, I need help with this error', time: '10:30' },
    { sender: 'mentor', text: 'Sure, let me take a look', time: '10:31' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { sender: 'student', text: newMessage, time: new Date().toLocaleTimeString() },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="bg-gray-800 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Code2 className="w-6 h-6 text-blue-400" />
          <h1 className="text-white font-bold text-lg">Live Session</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-red-500 rounded-full flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">35:42</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 grid grid-cols-2 gap-4 p-4">
            <div className="bg-gray-800 rounded-lg overflow-hidden relative">
              <div className="absolute top-3 left-3 px-2 py-1 bg-black bg-opacity-50 rounded text-white text-sm font-medium">
                Student
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-24 h-24 text-gray-600" />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden relative">
              <div className="absolute top-3 left-3 px-2 py-1 bg-black bg-opacity-50 rounded text-white text-sm font-medium">
                Mentor
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-24 h-24 text-gray-600" />
              </div>
            </div>

            <div className="col-span-2 bg-gray-800 rounded-lg p-4 overflow-auto">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="w-5 h-5 text-blue-400" />
                <h3 className="text-white font-medium">Code Display</h3>
              </div>
              <pre className="bg-gray-900 p-4 rounded text-green-400 text-sm overflow-x-auto">
                <code>{`function example() {
  const data = [1, 2, 3];
  return data.map(item => item * 2);
}

// Error: Cannot read property 'map' of undefined`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-gray-800 px-6 py-4 flex justify-center gap-4">
            <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors">
              <Mic className="w-6 h-6 text-white" />
            </button>
            <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors">
              <Video className="w-6 h-6 text-white" />
            </button>
            <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors">
              <Monitor className="w-6 h-6 text-white" />
            </button>
            <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors">
              <Square className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => onNavigate('session-summary')}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors text-white font-medium"
            >
              End Session
            </button>
          </div>
        </div>

        <div className="w-80 bg-gray-800 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-medium">Chat</h3>
              <span className="text-gray-400 text-sm">Student & Mentor</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.sender === 'student' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === 'student'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
