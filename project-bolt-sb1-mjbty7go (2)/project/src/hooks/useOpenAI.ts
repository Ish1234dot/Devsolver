import { useState } from 'react';
import { QueryState, ProgrammingLanguage, CodeResponse } from '../types';
import { getOpenAIResponse } from '../services/openai';

export function useOpenAI() {
  const [queryState, setQueryState] = useState<QueryState>({
    isLoading: false,
    error: null,
    response: null,
  });

  const handleQuery = async (query: string, language: ProgrammingLanguage) => {
    setQueryState({ isLoading: true, error: null, response: null });
    
    try {
      const response = await getOpenAIResponse(query, language);
      setQueryState({ isLoading: false, error: null, response });
      return response; // Return response for history tracking
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setQueryState({
        isLoading: false,
        error: errorMessage,
        response: null,
      });
      return null;
    }
  };

  return { queryState, handleQuery };
}