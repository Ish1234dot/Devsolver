import React from 'react';
import { Code2, BookOpen, Lightbulb, Shield, Copy, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Code2 className="w-6 h-6 text-blue-600" />,
    title: 'Multiple Languages',
    description: 'DevSolver supports popular programming languages including JavaScript, Python, and CSS.'
  },
  {
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    title: 'Clear Explanations',
    description: 'Get detailed, easy-to-understand explanations for any programming concept.'
  },
  {
    icon: <Copy className="w-6 h-6 text-blue-600" />,
    title: 'Code Examples',
    description: 'Real-world code examples with syntax highlighting and copy functionality.'
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-blue-600" />,
    title: 'Practical Tips',
    description: 'Helpful tips and tricks to improve your coding skills and avoid common pitfalls.'
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    title: 'Best Practices',
    description: 'Learn industry-standard best practices for writing clean and maintainable code.'
  },
];

export function Features() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Learn
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            DevSolver provides comprehensive learning resources to help you master programming concepts quickly and effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center shadow-sm mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}