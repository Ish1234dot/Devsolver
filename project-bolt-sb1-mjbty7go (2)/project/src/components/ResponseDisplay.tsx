import React from 'react';
import { CodeResponse } from '../types';
import { BookOpen, Code, Lightbulb, AlertTriangle } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { ResponseSection } from './ResponseSection';

interface ResponseDisplayProps {
  response: CodeResponse;
  language: string;
}

export function ResponseDisplay({ response, language }: ResponseDisplayProps) {
  return (
    <div className="w-full max-w-3xl space-y-4 sm:space-y-6 px-4">
      <ResponseSection icon={<BookOpen className="w-5 h-5 text-blue-600" />} title="Explanation">
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{response.explanation}</p>
      </ResponseSection>

      {response.codeExamples.map((example, index) => (
        <ResponseSection 
          key={index}
          icon={<Code className="w-5 h-5 text-blue-600" />} 
          title={example.title}
        >
          <p className="text-sm sm:text-base text-gray-700 mb-4">{example.description}</p>
          <CodeBlock code={example.code} language={language} />
        </ResponseSection>
      ))}

      <ResponseSection icon={<Lightbulb className="w-5 h-5 text-blue-600" />} title="Tips">
        <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base">
          {response.tips.map((tip, index) => (
            <li key={index} className="text-gray-700">{tip}</li>
          ))}
        </ul>
      </ResponseSection>

      <ResponseSection icon={<AlertTriangle className="w-5 h-5 text-blue-600" />} title="Best Practices">
        <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base">
          {response.bestPractices.map((practice, index) => (
            <li key={index} className="text-gray-700">{practice}</li>
          ))}
        </ul>
      </ResponseSection>
    </div>
  );
}