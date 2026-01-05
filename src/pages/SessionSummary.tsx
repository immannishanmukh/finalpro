import { useState } from 'react';
import { CheckCircle, Download, Star, User, Code2 } from 'lucide-react';

interface SessionSummaryProps {
  onNavigate: (page: string) => void;
}

export default function SessionSummary({ onNavigate }: SessionSummaryProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <Code2 className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">Session Summary</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <div className="text-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Session Completed
            </h2>
            <p className="text-gray-600">Here's a summary of your session</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Session Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Mentor who solved</p>
                    <p className="font-medium text-gray-900">John Mentor</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="text-sm font-medium text-gray-900 ml-1">5.0</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Code2 className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Skills</p>
                    <div className="flex gap-2 mt-1">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        Python
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                        Debugging
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Error & Solution</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Error:</p>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <code className="text-sm text-red-800">
                      TypeError: Cannot read property 'map' of undefined
                    </code>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Solution:</p>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <code className="text-sm text-green-800">
                      Add null check before mapping array
                    </code>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Description discussed:</p>
                  <p className="text-sm text-gray-700">
                    The error occurred because the array was undefined. Added proper
                    validation and error handling to prevent this issue.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
            <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Feedback
            </button>
            <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Summary
            </button>
          </div>
        </div>

        {!submitted ? (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Rate Your Session</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  How would you rate this session?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-2 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Feedback (Optional)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  placeholder="Share your experience..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('student-dashboard')}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Go to Dashboard
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Thank you for your feedback!
            </h3>
            <p className="text-gray-600 mb-6">
              Your feedback helps us improve the platform
            </p>
            <button
              onClick={() => onNavigate('student-dashboard')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
