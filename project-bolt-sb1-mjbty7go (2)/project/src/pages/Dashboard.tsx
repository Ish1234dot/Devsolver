import React, { useState } from 'react';
import { SearchSection } from '../components/SearchSection';
import { ErrorMessage } from '../components/ErrorMessage';
import { ResponseDisplay } from '../components/ResponseDisplay';
import { useOpenAI } from '../hooks/useOpenAI';
import { ProgrammingLanguage } from '../types';
import { useHistory } from '../hooks/useHistory';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export function Dashboard() {
  const { queryState, handleQuery } = useOpenAI();
  const { addToHistory } = useHistory();
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>('javascript');

  const handleSubmit = async (query: string) => {
    const response = await handleQuery(query, selectedLanguage);
    if (response) {
      await addToHistory(query, selectedLanguage, response);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <SearchSection
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          onSubmit={handleSubmit}
          isLoading={queryState.isLoading}
        />

        {queryState.error && <ErrorMessage message={queryState.error} />}

        {queryState.response && (
          <ResponseDisplay 
            response={queryState.response}
            language={selectedLanguage}
          />
        )}
      </div>
    </DashboardLayout>
  );
}