
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Users, TrendingUp, Zap, Shield, Globe, ChevronRight, Play, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CoDeb</h1>
                <p className="text-xs text-blue-200">AI Debugging Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/app">
                <Button variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-400 hover:text-white">
                  Try Demo
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm mb-6">
              <Star className="w-4 h-4" />
              AI-Powered Code Debugging Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Debug Code
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"> Instantly</span>
              <br />with AI
            </h1>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              CoDeb revolutionizes coding education with AI-powered debugging, voice recognition, and intelligent explanations. 
              Perfect for students, educators, and institutions.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/app">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-lg px-8 py-6">
                <Play className="w-5 h-5 mr-2" />
                Try Live Demo
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-400 hover:text-white text-lg px-8 py-6">
              View Pitch Deck
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50M+</div>
              <div className="text-blue-200">Computer Science Students Globally</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">40%</div>
              <div className="text-blue-200">Time Spent on Debugging</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$15B</div>
              <div className="text-blue-200">EdTech Market Size</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">The Problem</h2>
              <div className="space-y-4 text-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 shrink-0"></div>
                  <p>Students spend 40% of coding time struggling with unclear error messages</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 shrink-0"></div>
                  <p>Limited access to expert tutors for instant debugging support</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 shrink-0"></div>
                  <p>Frustration leads to 30% higher dropout rates in CS programs</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 shrink-0"></div>
                  <p>Accessibility barriers for students with learning difficulties</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Solution</h2>
              <div className="space-y-4 text-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 shrink-0"></div>
                  <p>Instant AI-powered code analysis and debugging suggestions</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 shrink-0"></div>
                  <p>Voice recognition for accessibility and mobile-first experience</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 shrink-0"></div>
                  <p>Educational explanations that help students learn from mistakes</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 shrink-0"></div>
                  <p>Multi-language support for diverse programming curricula</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Core Features</h2>
            <p className="text-xl text-blue-200">Revolutionary AI technology meets intuitive design</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Instant Code Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-200">AI-powered debugging that identifies syntax, runtime, and logical errors in real-time with detailed explanations.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Voice Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-200">Natural language processing with voice input for accessibility and hands-free debugging experience.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Learning Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-200">Educational explanations and annotated code fixes that help students learn from their mistakes.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Market Opportunity</h2>
            <p className="text-xl text-blue-200">Massive addressable market in EdTech and Developer Tools</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border-blue-400/30 backdrop-blur-sm text-center">
              <CardContent className="pt-8">
                <Users className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">50M+ Students</h3>
                <p className="text-blue-200">Computer Science students globally struggling with debugging</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-400/30 backdrop-blur-sm text-center">
              <CardContent className="pt-8">
                <TrendingUp className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">$15B Market</h3>
                <p className="text-blue-200">Global EdTech market growing 16.3% annually</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-purple-400/30 backdrop-blur-sm text-center">
              <CardContent className="pt-8">
                <Code className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">20K+ Schools</h3>
                <p className="text-blue-200">Educational institutions seeking AI-powered tools</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Revenue Streams</h2>
            <p className="text-xl text-blue-200">Multiple monetization strategies for sustainable growth</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">B2C</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Freemium Model</h3>
              <p className="text-blue-200 text-sm">$9.99/month premium features</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-400">B2B</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Institutional</h3>
              <p className="text-blue-200 text-sm">$500-5000/month enterprise</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">API</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Developer API</h3>
              <p className="text-blue-200 text-sm">Usage-based pricing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-400">EDU</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Training</h3>
              <p className="text-blue-200 text-sm">Certification programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform CS Education?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join us in revolutionizing how students learn to code. Experience the future of debugging today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6">
                Try Demo Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-900 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded">
                <Code className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">CoDeb</div>
                <div className="text-xs text-blue-200">AI Debugging Assistant</div>
              </div>
            </div>
            <div className="text-blue-200 text-sm">
              © 2024 CoDeb. All rights reserved. | contact@codeb.ai
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
