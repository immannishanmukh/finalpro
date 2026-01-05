import { useState } from 'react';
import { Home, Upload, Calendar, MessageSquare } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import ErrorUploadPage from './ErrorUploadPage';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
}

export default function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: 'Dashboard',
      active: activeTab === 'dashboard',
      onClick: () => setActiveTab('dashboard'),
    },
    {
      icon: <Upload className="w-5 h-5" />,
      label: 'Upload Error',
      active: activeTab === 'upload',
      onClick: () => setActiveTab('upload'),
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Sessions',
      active: activeTab === 'sessions',
      onClick: () => setActiveTab('sessions'),
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Feedback',
      active: activeTab === 'feedback',
      onClick: () => setActiveTab('feedback'),
    },
  ];

  const renderContent = () => {
    if (activeTab === 'upload') {
      return <ErrorUploadPage />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Errors Uploaded</h3>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">Python TypeError</p>
                  <p className="text-sm text-gray-600">Uploaded 2 hours ago</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Pending
                </span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">JavaScript Async Error</p>
                  <p className="text-sm text-gray-600">Uploaded 5 hours ago</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  AI Solved
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('upload')}
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Upload Error
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">AI Solved Errors</h3>
          <div className="space-y-3">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="font-medium text-gray-900 mb-1">React Hook Dependencies</p>
              <p className="text-sm text-gray-600 mb-3">Solved with AI explanation</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Solution →
              </button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="font-medium text-gray-900 mb-1">CSS Flexbox Layout</p>
              <p className="text-sm text-gray-600 mb-3">Solved with AI explanation</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Solution →
              </button>
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            View All Solutions
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Past Sessions</h3>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">Session with John Mentor</p>
                  <p className="text-sm text-gray-600">Python Debugging</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">4.5</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Dec 20, 2024 - 45 mins</p>
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            View History
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Active Sessions</h3>
          <div className="p-6 text-center bg-gray-50 rounded-lg">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No active sessions</p>
            <button
              onClick={() => onNavigate('live-session')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Join Session
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} onNavigate={onNavigate}>
      {renderContent()}
    </DashboardLayout>
  );
}
