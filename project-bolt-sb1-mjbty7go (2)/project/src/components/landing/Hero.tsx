import React from 'react';
import { Brain, Sparkles, Zap } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn Programming with<br />
            <span className="text-blue-600">"How To" Questions</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ask any programming question starting with "How to" and get instant, AI-powered explanations with code examples and best practices.
          </p>
          
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors text-lg sm:text-xl font-semibold shadow-lg
                     hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Try DevSolver Now
          </button>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm sm:text-base">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Brain className="w-5 h-5 text-blue-600" />
              <span>AI-Powered Learning</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Zap className="w-5 h-5 text-blue-600" />
              <span>Instant Answers</span>
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