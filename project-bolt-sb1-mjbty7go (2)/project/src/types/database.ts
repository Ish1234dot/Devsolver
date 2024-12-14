export interface Database {
  public: {
    Tables: {
      search_history: {
        Row: {
          id: string;
          user_id: string;
          query: string;
          language: string;
          response: {
            explanation: string;
            codeExamples: Array<{
              title: string;
              code: string;
              description: string;
            }>;
            tips: string[];
            bestPractices: string[];
          };
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          query: string;
          language: string;
          response: {
            explanation: string;
            codeExamples: Array<{
              title: string;
              code: string;
              description: string;
            }>;
            tips: string[];
            bestPractices: string[];
          };
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          query?: string;
          language?: string;
          response?: {
            explanation: string;
            codeExamples: Array<{
              title: string;
              code: string;
              description: string;
            }>;
            tips: string[];
            bestPractices: string[];
          };
          created_at?: string;
        };
      };
    };
  };
}