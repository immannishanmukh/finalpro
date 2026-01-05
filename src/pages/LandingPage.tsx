import { Code2, Users, Zap, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">MEET-OF-MINDS</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => onNavigate('login')}
              className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Learn & Solve Errors
            <br />
            <span className="text-blue-600">with Expert Mentors</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant AI-powered solutions or connect with experienced mentors
            for personalized coding help
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onNavigate('signup')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg border-2 border-gray-200">
              How it Works
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Your Error</h3>
            <p className="text-gray-600">
              Share your code error through image upload or paste directly
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Analysis</h3>
            <p className="text-gray-600">
              Get instant AI-powered solutions and explanations for common errors
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Connect with Mentors</h3>
            <p className="text-gray-600">
              Join live sessions with expert mentors for complex problems
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
