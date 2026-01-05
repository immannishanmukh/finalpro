import { useState } from 'react';
import { Home, Calendar, MessageSquare, Settings } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import SkillsManagement from './SkillsManagement';

interface MentorDashboardProps {
  onNavigate: (page: string) => void;
}

export default function MentorDashboard({ onNavigate }: MentorDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: 'Dashboard',
      active: activeTab === 'dashboard',
      onClick: () => setActiveTab('dashboard'),
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
    if (activeTab === 'skills') {
      return <SkillsManagement />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Incoming Session Requests</h3>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">Jane Student</p>
                  <p className="text-sm text-gray-600">Python - TypeError Issue</p>
                </div>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-medium">
                  Urgent
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">Requested 10 mins ago</p>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                View Request
              </button>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">Mike Developer</p>
                  <p className="text-sm text-gray-600">JavaScript - Async/Await</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">Requested 1 hour ago</p>
              <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                View Request
              </button>
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            View All Requests
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Active Sessions</h3>
          <div className="p-6 text-center bg-green-50 rounded-lg border border-green-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
              Live Session
            </div>
            <p className="font-medium text-gray-900 mb-1">Session with Sarah Student</p>
            <p className="text-sm text-gray-600 mb-4">React Hooks - 25 mins elapsed</p>
            <button
              onClick={() => onNavigate('live-session')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Join Session
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Past Sessions</h3>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">John Student</p>
                  <p className="text-sm text-gray-600">Python Debugging</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">5.0</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Dec 20, 2024 - 45 mins</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">Emily Coder</p>
                  <p className="text-sm text-gray-600">CSS Layout Issues</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Dec 19, 2024 - 30 mins</p>
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            View History
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Skill Management</h3>
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-2">Your Active Skills:</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Python - Expert
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                JavaScript - Advanced
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                TypeScript - Intermediate
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('skills')}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Manage Skills
          </button>
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
