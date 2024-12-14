import React from 'react';
import { SearchBar } from './SearchBar';
import { LanguageSelector } from './LanguageSelector';
import { ProgrammingLanguage } from '../types';

interface SearchSectionProps {
  selectedLanguage: ProgrammingLanguage;
  onLanguageChange: (language: ProgrammingLanguage) => void;
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export function SearchSection({
  selectedLanguage,
  onLanguageChange,
  onSubmit,
  isLoading,
}: SearchSectionProps) {
  return (
    <div className="w-full max-w-3xl flex flex-col gap-3 sm:gap-4 px-4">
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
      />
      <SearchBar 
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}