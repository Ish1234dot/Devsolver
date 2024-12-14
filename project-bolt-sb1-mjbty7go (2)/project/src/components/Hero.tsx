import React from 'react';
import { Code2, Sparkles, Brain } from 'lucide-react';

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Code2 className="w-16 h-16 sm:w-20 sm:h-20 text-blue-600" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn Programming<br />
            <span className="text-blue-600">The Smart Way</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant, AI-powered explanations for any programming concept.
            Clear examples, best practices, and practical tips to accelerate your learning.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Brain className="w-5 h-5 text-blue-600" />
              <span>AI-Powered Responses</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Code2 className="w-5 h-5 text-blue-600" />
              <span>Multiple Languages</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Best Practices</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}