
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Code, Send, Lightbulb, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [debugResult, setDebugResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  const toggleVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
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
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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

      recognitionRef.current.onresult = (event: any) => {
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
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key to use the debugging feature.",
        variant: "destructive"
      });
      return;
    }

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
        description: "Failed to analyze code. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CoDeb
              </h1>
              <p className="text-sm text-gray-600">AI-Powered Code Debugging Assistant</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* API Key Input */}
        <Card className="mb-6 border-blue-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Lightbulb className="w-5 h-5" />
              Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Gemini API Key (Required for debugging)
              </label>
              <Input
                type="password"
                placeholder="Enter your Gemini API key here..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="border-blue-200 focus:border-blue-400"
              />
              <p className="text-xs text-gray-500">
                Your API key is stored locally and only used for debugging requests.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Code Input */}
            <Card className="border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Code className="w-5 h-5" />
                  Code to Debug
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="border-blue-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="c">C</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Textarea
                    placeholder={`Paste your ${language} code here for debugging...`}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={12}
                    className="font-mono text-sm border-blue-200 focus:border-blue-400 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Question Input */}
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2 text-green-800">
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
                      className="border-green-200 focus:border-green-400 resize-none flex-1"
                    />
                    <Button
                      onClick={toggleVoiceRecognition}
                      variant={isListening ? "destructive" : "outline"}
                      size="sm"
                      className={`shrink-0 self-start ${isListening ? 'bg-red-500 hover:bg-red-600' : 'border-green-200 hover:bg-green-50'}`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={analyzeCode}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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
          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <Lightbulb className="w-5 h-5" />
                Debug Results & Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {debugResult ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                      {debugResult}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                      <Code className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Ready to help debug your code!</h3>
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

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">Smart Code Analysis</h3>
              <p className="text-sm text-gray-600">
                AI-powered debugging that explains errors in simple terms students can understand.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mic className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Voice Recognition</h3>
              <p className="text-sm text-gray-600">
                Ask questions using your voice for hands-free debugging and accessibility.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-purple-800 mb-2">Learning Focused</h3>
              <p className="text-sm text-gray-600">
                Get explanations and tips to help you learn from your mistakes and improve.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
