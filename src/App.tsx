import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import LiveSession from './pages/LiveSession';
import SessionSummary from './pages/SessionSummary';

type Page = 'landing' | 'login' | 'signup' | 'student-dashboard' | 'mentor-dashboard' | 'live-session' | 'session-summary';

function App() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>(user ? (user.role === 'student' ? 'student-dashboard' : 'mentor-dashboard') : 'landing');

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigate} />;
      case 'login':
        return <AuthPage mode="login" onNavigate={navigate} />;
      case 'signup':
        return <AuthPage mode="signup" onNavigate={navigate} />;
      case 'student-dashboard':
        return <StudentDashboard onNavigate={navigate} />;
      case 'mentor-dashboard':
        return <MentorDashboard onNavigate={navigate} />;
      case 'live-session':
        return <LiveSession onNavigate={navigate} />;
      case 'session-summary':
        return <SessionSummary onNavigate={navigate} />;
      default:
        return <LandingPage onNavigate={navigate} />;
    }
  };

  return renderPage();
}

export default App;
