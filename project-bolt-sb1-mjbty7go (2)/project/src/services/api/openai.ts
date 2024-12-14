import { config } from '../../config/env';
import { CodeResponse, ProgrammingLanguage } from '../../types';
import { validateLanguageQuery } from '../validators/languageValidator';
import { parseOpenAIResponse } from '../parsers/openaiParser';
import { SYSTEM_PROMPT } from '../constants/prompts';

export async function getOpenAIResponse(query: string, language: ProgrammingLanguage): Promise<CodeResponse> {
  if (config.openai.apiKey === 'missing') {
    throw new Error('OpenAI API key is not configured. Please check your environment variables.');
  }

  // Validate the query against the selected language
  validateLanguageQuery(query, language);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.openai.apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { 
          role: 'user', 
          content: `Provide a solution in ${language} for: How to ${query}. 
                   IMPORTANT: Only provide code examples in ${language}.
                   If the concept exists in other languages but needs to be implemented differently in ${language}, 
                   explain the ${language}-specific approach.` 
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
    throw new Error(error.error?.message || 'Failed to get response from OpenAI');
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  return parseOpenAIResponse(content);
}