import { useState } from 'react';
import { Upload, Image as ImageIcon, Code, Zap } from 'lucide-react';

export default function ErrorUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [showAiSolution, setShowAiSolution] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleAnalyze = () => {
    setShowAiSolution(true);
  };

  const languages = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'C++', 'Go', 'Rust'];

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Error</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Submit Coding Error</h3>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-700 font-medium mb-1">Drag & drop image or error</p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <label className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Browse Files
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a language...</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or Paste Error Code
            </label>
            <textarea
              value={errorCode}
              onChange={(e) => setErrorCode(e.target.value)}
              rows={6}
              placeholder="Paste your error message or code here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <button
            onClick={handleAnalyze}
            className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Analyze with AI
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Instructions</h3>
          <div className="space-y-4 text-gray-600">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <p>Upload source code file or error image</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <p>Or paste the error message or code</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <p>Select programming language</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <p>Click "Analyze with AI" - the AI will attempt to analyze your error</p>
            </div>
          </div>

          {showAiSolution && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-2 mb-3">
                <Code className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">AI Solution</h4>
                  <div className="bg-white p-3 rounded border border-green-200 mb-3">
                    <code className="text-sm text-gray-800">
                      {`// Fixed code example
const result = array.map(item => item.value);`}
                    </code>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Explanation</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    The error was caused by incorrect array method usage. The solution uses
                    the correct syntax for array mapping.
                  </p>
                  <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                    Mark as Solved
                  </button>
                </div>
              </div>
            </div>
          )}

          {showAiSolution && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">If not solved</h4>
              <p className="text-sm text-gray-600 mb-3">
                AI was unable to solve your error
              </p>
              <button className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm">
                Find a Professional
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
