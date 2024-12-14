export type ProgrammingLanguage = 'javascript' | 'python' | 'css';

export interface CodeExample {
  title: string;
  code: string;
  description: string;
}

export interface CodeResponse {
  explanation: string;
  codeExamples: CodeExample[];
  tips: string[];
  bestPractices: string[];
}

export interface QueryState {
  isLoading: boolean;
  error: string | null;
  response: CodeResponse | null;
}