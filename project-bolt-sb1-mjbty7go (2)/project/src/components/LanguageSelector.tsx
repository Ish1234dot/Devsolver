import React from 'react';
import { Code2 } from 'lucide-react';
import { ProgrammingLanguage } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: ProgrammingLanguage;
  onLanguageChange: (language: ProgrammingLanguage) => void;
}

const languages: { value: ProgrammingLanguage; label: string; }[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'css', label: 'CSS' },
];

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 p-2 shadow-sm w-full sm:w-auto">
      <Code2 className="w-5 h-5 text-blue-600" />
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value as ProgrammingLanguage)}
        className="bg-transparent border-none focus:outline-none text-gray-700 font-medium text-sm sm:text-base w-full"
      >
        {languages.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}