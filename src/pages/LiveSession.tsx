import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import Split from 'react-split';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, Video, Monitor, Square, MessageSquare, User, Code2, 
  Play, Sun, Moon, CheckCircle, XCircle,
  Loader
} from 'lucide-react';

// --- TYPES & INTERFACES ---

interface Message {
  sender: 'student' | 'mentor';
  text: string;
  time: string;
}

interface ControlBarProps {
  language: string;
  setLanguage: (lang: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  handleRun: () => void;
  running: boolean;
}

interface IOPanelProps {
  input: string;
  setInput: (value: string) => void;
  expectedOutput: string;
  setExpectedOutput: (value: string) => void;
  output: string;
  isCorrect: boolean | null;
  running: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface LiveSessionProps {
  onNavigate: (page: string) => void;
}

interface PistonResponse {
  language: string;
  version: string;
  run?: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
    signal: string | null;
  };
  message?: string;
}

// --- CONSTANTS ---
const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

const LANGUAGE_MAP: Record<string, string> = {
  js: "javascript",
  py: "python",
  cpp: "c++",
  c: "c",
  java: "java",
  go: "go",
  cs: "csharp",
};

const DEFAULT_CODE: Record<string, string> = {
  js: "function example() {\n  const data = [1, 2, 3];\n  return data.map(item => item * 2);\n}\n\nconsole.log(example());",
  py: "print('Hello from Python!')",
  cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++!";\n    return 0;\n}',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello from C!");\n    return 0;\n}',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}',
  go: 'package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}',
  cs: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello from C#!");\n    }\n}',
};

// --- SUB-COMPONENTS ---

const ControlBar: React.FC<ControlBarProps> = ({ language, setLanguage, setTheme, theme, handleRun, running }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-900 border-b border-gray-700 rounded-t-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
           <Code2 className="w-5 h-5 text-blue-400" />
           <h3 className="text-white font-medium">Compiler</h3>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 border border-gray-600 text-white px-3 py-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {Object.entries(LANGUAGE_MAP).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
          className="p-1.5 rounded hover:bg-gray-700 text-gray-300 transition-colors"
          title="Toggle Theme"
        >
          {theme === "vs-dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <motion.button
          onClick={handleRun}
          disabled={running}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {running ? <Loader size={14} className="animate-spin" /> : <Play size={14} />}
          {running ? "Running..." : "Run"}
        </motion.button>
      </div>
    </div>
  );
};

const IOPanel: React.FC<IOPanelProps> = ({ input, setInput, expectedOutput, setExpectedOutput, output, isCorrect, running, activeTab, setActiveTab }) => {
  
  interface TabButtonProps {
    name: string;
    label: string;
  }

  const TabButton: React.FC<TabButtonProps> = ({ name, label }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`px-3 py-2 text-xs font-medium transition-colors border-b-2 ${
        activeTab === name
          ? "text-blue-400 border-blue-400"
          : "text-gray-400 border-transparent hover:text-gray-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-b-lg">
      <div className="flex-shrink-0 flex items-center border-b border-gray-700 px-2">
        <TabButton name="input" label="Input" />
        <TabButton name="output" label="Output" />
        <TabButton name="expected" label="Expected" />
      </div>
      <div className="flex-grow p-3 overflow-y-auto">
        {activeTab === 'input' && (
          <textarea
            className="w-full h-full bg-transparent text-gray-300 placeholder-gray-600 resize-none focus:outline-none font-mono text-sm"
            value={input}
            placeholder="Enter standard input here..."
            onChange={(e) => setInput(e.target.value)}
          />
        )}
        {activeTab === 'output' && (
          <AnimatePresence mode="wait">
            <motion.div
              key={running ? "loading" : "result"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full h-full ${running ? "animate-pulse" : ""}`}
            >
              {running ? (
                <div className="text-gray-500 font-mono text-sm">Compiling...</div>
              ) : (
                <>
                  <pre className={`whitespace-pre-wrap font-mono text-sm ${
                    isCorrect === true ? "text-green-400" : isCorrect === false ? "text-red-400" : "text-gray-300"
                  }`}>
                    {output || <span className="text-gray-600 italic">No output yet.</span>}
                  </pre>
                  {isCorrect !== null && (
                    <div className={`mt-2 flex items-center gap-2 text-xs font-semibold ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                      {isCorrect ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {isCorrect ? "Output Matched!" : "Output Mismatch"}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}
        {activeTab === 'expected' && (
           <textarea
            className="w-full h-full bg-transparent text-gray-300 placeholder-gray-600 resize-none focus:outline-none font-mono text-sm"
            value={expectedOutput}
            placeholder="Expected output for validation..."
            onChange={(e) => setExpectedOutput(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function LiveSession({ onNavigate }: LiveSessionProps) {
  // --- CHAT STATE ---
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'student', text: 'Hi, I need help with this error', time: '10:30' },
    { sender: 'mentor', text: 'Sure, let me take a look', time: '10:31' },
  ]);
  const [newMessage, setNewMessage] = useState<string>('');

  // --- COMPILER STATE ---
  const [language, setLanguage] = useState<string>("js");
  const [code, setCode] = useState<string>(DEFAULT_CODE.js);
  const [theme, setTheme] = useState<string>("vs-dark");
  const [input, setInput] = useState<string>("");
  const [expectedOutput, setExpectedOutput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [running, setRunning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("input");

  // Handle Compiler Logic
  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    if (DEFAULT_CODE[lang]) {
      setCode(DEFAULT_CODE[lang]);
    }
    setOutput("");
    setIsCorrect(null);
  };

  const handleRun = async () => {
    setActiveTab("output"); 
    setRunning(true);
    setOutput("");
    setIsCorrect(null);

    const runtimeLanguage = LANGUAGE_MAP[language];

    try {
      const res = await fetch(PISTON_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           language: runtimeLanguage,
           version: "*",
           files: [{ content: code }],
           stdin: input
        }),
      });

      const data: PistonResponse = await res.json();
      const { stdout, stderr, output: rawOutput } = data.run || {};
      
      if (data.message) {
         setOutput(`Error: ${data.message}`);
         setRunning(false);
         return;
      }

      const finalOutput = (stdout || "") + (stderr || "");
      const cleanOutput = finalOutput || rawOutput || "Execution finished with no output.";
      
      setOutput(cleanOutput);

      if (expectedOutput.trim()) {
        setIsCorrect(cleanOutput.trim() === expectedOutput.trim());
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setOutput(`An error occurred: ${err.message}`);
      } else {
        setOutput('An unknown error occurred.');
      }
    } finally {
      setRunning(false);
    }
  };

  // Handle Chat Logic
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
      <Toaster position="top-center" />
      
      {/* HEADER */}
      <header className="bg-gray-800 px-6 py-3 flex justify-between items-center border-b border-gray-700">
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

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          
          {/* GRID LAYOUT */}
          <div className="flex-1 grid grid-cols-2 gap-4 p-4 min-h-0">
            
            {/* Student Video */}
            <div className="bg-gray-800 rounded-lg overflow-hidden relative h-48 md:h-auto">
              <div className="absolute top-3 left-3 px-2 py-1 bg-black bg-opacity-50 rounded text-white text-sm font-medium z-10">
                Student
              </div>
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <User className="w-24 h-24 text-gray-600" />
              </div>
            </div>

            {/* Mentor Video */}
            <div className="bg-gray-800 rounded-lg overflow-hidden relative h-48 md:h-auto">
              <div className="absolute top-3 left-3 px-2 py-1 bg-black bg-opacity-50 rounded text-white text-sm font-medium z-10">
                Mentor
              </div>
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <User className="w-24 h-24 text-gray-600" />
              </div>
            </div>

            {/* --- COMPILER INTEGRATION --- */}
            <div className="col-span-2 bg-gray-800 rounded-lg overflow-hidden flex flex-col border border-gray-700 h-[500px]">
              {/* Control Bar */}
              <ControlBar 
                language={language}
                setLanguage={handleSetLanguage}
                theme={theme}
                setTheme={setTheme}
                handleRun={handleRun}
                running={running}
              />
              
              {/* Split Pane: Editor & I/O */}
              <div className="flex-grow relative">
                <Split
                    className="flex h-full"
                    direction="horizontal"
                    sizes={[70, 30]}
                    minSize={200}
                    gutterSize={8}
                    gutterStyle={() => ({ backgroundColor: '#374151' })} // gray-700
                >
                    {/* Monaco Editor */}
                    <div className="h-full overflow-hidden">
                        <Editor
                            height="100%"
                            language={language === "js" ? "javascript" : language === "py" ? "python" : language}
                            value={code}
                            onChange={(v) => setCode(v || "")}
                            theme={theme}
                            options={{
                                fontSize: 14,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                padding: { top: 16 },
                                fontLigatures: true,
                            }}
                        />
                    </div>

                    {/* I/O Panel */}
                    <div className="h-full overflow-hidden">
                        <IOPanel 
                            input={input}
                            setInput={setInput}
                            expectedOutput={expectedOutput}
                            setExpectedOutput={setExpectedOutput}
                            output={output}
                            isCorrect={isCorrect}
                            running={running}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </div>
                </Split>
              </div>
            </div>
            {/* --- END COMPILER INTEGRATION --- */}

          </div>

          {/* CONTROLS */}
          <div className="bg-gray-800 px-6 py-4 flex justify-center gap-4 border-t border-gray-700">
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

        {/* CHAT SIDEBAR */}
        <div className="w-80 bg-gray-800 flex flex-col border-l border-gray-700">
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
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
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
