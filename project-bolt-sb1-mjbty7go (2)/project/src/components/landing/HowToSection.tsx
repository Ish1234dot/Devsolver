import React from 'react';
import { MessageSquareCode } from 'lucide-react';

const examples = [
  "center a div in CSS",
  "create a REST API in Python",
  "implement a debounce function in JavaScript"
];

export function HowToSection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-8">
            <MessageSquareCode className="w-5 h-5" />
            <span className="font-medium">Just Ask "How To"</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Get Answers to Your Programming Questions
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Simply start with "How to" and ask any programming question. Our AI will provide detailed explanations, code examples, and best practices.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {examples.map((example, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <p className="text-gray-400 mb-2 text-sm">Try asking:</p>
                <p className="text-gray-900">
                  <span className="text-blue-600 font-medium">How to</span>{" "}
                  {example}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}