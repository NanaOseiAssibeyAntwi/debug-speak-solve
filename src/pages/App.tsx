import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Code, Send, Lightbulb, BookOpen, ArrowLeft, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

const programmingLanguages = [
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'scala', label: 'Scala' },
  { value: 'dart', label: 'Dart' },
  { value: 'r', label: 'R' },
  { value: 'matlab', label: 'MATLAB' },
  { value: 'sql', label: 'SQL' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'bash', label: 'Bash' },
  { value: 'powershell', label: 'PowerShell' },
  { value: 'perl', label: 'Perl' },
  { value: 'lua', label: 'Lua' },
  { value: 'haskell', label: 'Haskell' },
  { value: 'clojure', label: 'Clojure' },
  { value: 'elixir', label: 'Elixir' },
  { value: 'erlang', label: 'Erlang' },
  { value: 'fsharp', label: 'F#' },
  { value: 'assembly', label: 'Assembly' },
  { value: 'cobol', label: 'COBOL' },
  { value: 'fortran', label: 'Fortran' },
  { value: 'vba', label: 'VBA' },
  { value: 'groovy', label: 'Groovy' },
  { value: 'julia', label: 'Julia' },
  { value: 'ocaml', label: 'OCaml' },
  { value: 'scheme', label: 'Scheme' },
  { value: 'prolog', label: 'Prolog' },
  { value: 'verilog', label: 'Verilog' },
  { value: 'vhdl', label: 'VHDL' }
];

const App = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [languageSearch, setLanguageSearch] = useState('');
  const [prompt, setPrompt] = useState('');
  const apiKey = 'AIzaSyA7d2vdTfSw5AHjtMQUavOUOLFuiI43yOk'; // Pre-configured for demo
  const [isListening, setIsListening] = useState(false);
  const [debugResult, setDebugResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  const filteredLanguages = programmingLanguages.filter(lang =>
    lang.label.toLowerCase().includes(languageSearch.toLowerCase()) ||
    lang.value.toLowerCase().includes(languageSearch.toLowerCase())
  );

  const toggleVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition. Please type your question instead.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Speak your debugging question now"
        });
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setPrompt(transcript);
        setIsListening(false);
        toast({
          title: "Voice Captured",
          description: `Understood: "${transcript}"`
        });
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Failed to capture voice. Please try again.",
          variant: "destructive"
        });
      };

      recognitionRef.current.start();
    }
  };

  const analyzeCode = async () => {
    if (!code.trim() && !prompt.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide either code to debug or ask a question.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setDebugResult('');

    try {
      let requestBody;
      
      if (code.trim()) {
        requestBody = {
          contents: [{
            parts: [{
              text: `You are CoDeb, an AI code debugging assistant for students. Analyze this ${language} code and provide debugging help:

CODE:
\`\`\`${language}
${code}
\`\`\`

${prompt.trim() ? `SPECIFIC QUESTION: ${prompt}` : ''}

Please provide:
1. Any bugs or issues you find
2. Explanations in simple terms for students
3. Suggested fixes with explanations
4. Learning tips to avoid similar issues

Format your response clearly with sections.`
            }]
          }]
        };
      } else {
        requestBody = {
          contents: [{
            parts: [{
              text: `You are CoDeb, an AI coding assistant for students. Answer this programming question in a clear, educational way:

QUESTION: ${prompt}

Please provide a helpful explanation suitable for students learning to code.`
            }]
          }]
        };
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const result = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received';
      setDebugResult(result);
      
      toast({
        title: "Analysis Complete",
        description: "CoDeb has analyzed your code and provided suggestions!"
      });
    } catch (error) {
      console.error('Error analyzing code:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">CoDeb</h1>
                  <p className="text-sm text-blue-200">AI-Powered Code Debugging Assistant</p>
                </div>
              </div>
            </div>
            <div className="text-blue-200 text-sm">
              Professional Demo Interface
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Code Input */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500/20 to-indigo-600/20">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Code className="w-5 h-5" />
                  Code to Debug
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
                      <Input
                        placeholder="Search programming languages..."
                        value={languageSearch}
                        onChange={(e) => setLanguageSearch(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-blue-300 pl-10"
                      />
                    </div>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {filteredLanguages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Textarea
                    placeholder={`Paste your ${programmingLanguages.find(l => l.value === language)?.label || language} code here for debugging...`}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={12}
                    className="font-mono text-sm bg-white/10 border-white/20 text-white placeholder:text-blue-300 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Question Input */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500/20 to-emerald-600/20">
                <CardTitle className="flex items-center gap-2 text-white">
                  <BookOpen className="w-5 h-5" />
                  Ask a Question
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Ask a specific question about your code or programming in general..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={3}
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-300 resize-none flex-1"
                    />
                    <Button
                      onClick={toggleVoiceRecognition}
                      variant={isListening ? "destructive" : "outline"}
                      size="sm"
                      className={`shrink-0 self-start ${isListening ? 'bg-red-500 hover:bg-red-600' : 'border-white/20 text-white hover:bg-white/10'}`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={analyzeCode}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Debug My Code
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500/20 to-pink-600/20">
              <CardTitle className="flex items-center gap-2 text-white">
                <Lightbulb className="w-5 h-5" />
                Debug Results & Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {debugResult ? (
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-blue-100 font-sans leading-relaxed">
                      {debugResult}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-blue-200">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full flex items-center justify-center">
                      <Code className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white mb-2">Ready to help debug your code!</h3>
                      <p className="text-sm">
                        Paste your code, ask a question, or use voice input to get started.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Showcase */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Smart Code Analysis</h3>
              <p className="text-sm text-blue-200">
                AI-powered debugging that explains errors in simple terms students can understand.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mic className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Voice Recognition</h3>
              <p className="text-sm text-blue-200">
                Ask questions using your voice for hands-free debugging and accessibility.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Learning Focused</h3>
              <p className="text-sm text-blue-200">
                Get explanations and tips to help you learn from your mistakes and improve.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App;
