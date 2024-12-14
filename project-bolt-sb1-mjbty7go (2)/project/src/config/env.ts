// Load environment variables with fallback
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.OPENAI_API_KEY;

export const config = {
  openai: {
    apiKey: OPENAI_API_KEY,
  }
} as const;

// Validate environment variables
if (!config.openai.apiKey) {
  console.error('OpenAI API key is missing. Please check your environment variables.');
  // Instead of throwing, we'll set a user-friendly error state
  config.openai.apiKey = 'missing';
}