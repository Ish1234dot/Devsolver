import { config } from '../config/env';
import { CodeResponse, ProgrammingLanguage, CodeExample } from '../types';

// Language-specific keywords and concepts
const LANGUAGE_VALIDATORS = {
  javascript: {
    keywords: ['javascript', 'js', 'node', 'npm', 'react', 'vue', 'angular', 'dom', 'event', 'promise', 'async'],
    concepts: ['callback', 'closure', 'prototype', 'this', 'hoisting', 'event loop']
  },
  python: {
    keywords: ['python', 'pip', 'django', 'flask', 'pandas', 'numpy', 'list comprehension', 'decorator'],
    concepts: ['generator', 'iterator', 'decorator', 'gil', 'virtualenv', 'pip']
  },
  css: {
    keywords: ['css', 'style', 'selector', 'flexbox', 'grid', 'animation', 'media query', 'position'],
    concepts: ['box model', 'cascade', 'specificity', 'responsive', 'layout', 'positioning']
  }
};

function validateLanguageQuery(query: string, language: ProgrammingLanguage): boolean {
  const normalizedQuery = query.toLowerCase();
  const validator = LANGUAGE_VALIDATORS[language];
  
  // Check if query explicitly mentions a different language
  const otherLanguages = Object.keys(LANGUAGE_VALIDATORS).filter(lang => lang !== language);
  for (const otherLang of otherLanguages) {
    if (normalizedQuery.includes(otherLang)) {
      throw new Error(`This question appears to be about ${otherLang}. Please select ${otherLang} from the language dropdown.`);
    }
  }

  // For CSS-specific validation - Removed overly strict validation
  if (language === 'css') {
    // Allow any styling/layout related questions without strict validation
    return true;
  }

  // For JavaScript-specific validation
  if (language === 'javascript' && normalizedQuery.match(/\b(pandas|numpy|django|flask|matplotlib)\b/i)) {
    throw new Error('This question appears to be about Python libraries. Please select Python from the language dropdown.');
  }

  // For Python-specific validation
  if (language === 'python' && normalizedQuery.match(/\b(npm|webpack|react|vue|angular|dom)\b/i)) {
    throw new Error('This question appears to be about JavaScript technologies. Please select JavaScript from the language dropdown.');
  }

  return true;
}

const SYSTEM_PROMPT = `You are a helpful programming assistant. You MUST follow this EXACT format for ALL responses:

EXPLANATION
[A clear, conceptual explanation of the topic. NO CODE HERE.]

CODE EXAMPLES
Example 1:
Title: [Short descriptive title]
Description: [Brief description]
\`\`\`[language]
[Code with comments]
\`\`\`

Example 2: (if needed)
Title: [Short descriptive title]
Description: [Brief description]
\`\`\`[language]
[Code with comments]
\`\`\`

TIPS
- [Practical tip 1]
- [Practical tip 2]
- [Practical tip 3]

BEST PRACTICES
- [Best practice 1]
- [Best practice 2]
- [Best practice 3]

Strict rules:
1. NEVER include code blocks in the explanation section
2. ALWAYS provide at least one code example with title and description
3. ALWAYS include exactly 3 or more tips
4. ALWAYS include exactly 3 or more best practices
5. Format ALL code blocks with proper syntax
6. ONLY provide code examples in the specified programming language
7. If the question is about a specific programming concept, explain it for the specified language`;

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

  try {
    // Extract sections using regex
    const extractSection = (header: string): string => {
      const regex = new RegExp(`${header}\\n([\\s\\S]*?)(?=\\n(?:EXPLANATION|CODE EXAMPLES|TIPS|BEST PRACTICES)|$)`, 'i');
      const match = content.match(regex);
      return match ? match[1].trim() : '';
    };

    // Get explanation (ensure no code blocks)
    const explanation = extractSection('EXPLANATION').replace(/```[\s\S]*?```/g, '').trim();

    // Parse code examples
    const codeExamplesSection = extractSection('CODE EXAMPLES');
    const codeExamples: CodeExample[] = [];
    
    // Split into individual examples and parse
    const exampleMatches = codeExamplesSection.split(/Example \d+:/g).filter(Boolean);
    
    for (const example of exampleMatches) {
      const titleMatch = example.match(/Title:\s*([^\n]+)/);
      const descMatch = example.match(/Description:\s*([^\n]+)/);
      const codeMatch = example.match(/```[\w]*\n([\s\S]*?)```/);
      
      if (titleMatch?.[1] && descMatch?.[1] && codeMatch?.[1]) {
        codeExamples.push({
          title: titleMatch[1].trim(),
          description: descMatch[1].trim(),
          code: codeMatch[1].trim()
        });
      }
    }

    // Fallback for single example without explicit numbering
    if (codeExamples.length === 0) {
      const titleMatch = codeExamplesSection.match(/Title:\s*([^\n]+)/);
      const descMatch = codeExamplesSection.match(/Description:\s*([^\n]+)/);
      const codeMatch = codeExamplesSection.match(/```[\w]*\n([\s\S]*?)```/);
      
      if (titleMatch?.[1] && descMatch?.[1] && codeMatch?.[1]) {
        codeExamples.push({
          title: titleMatch[1].trim(),
          description: descMatch[1].trim(),
          code: codeMatch[1].trim()
        });
      }
    }

    // Parse tips and best practices
    const parseBulletPoints = (section: string): string[] => {
      return section
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim())
        .filter(line => line.length > 0);
    };

    const tips = parseBulletPoints(extractSection('TIPS'));
    const bestPractices = parseBulletPoints(extractSection('BEST PRACTICES'));

    // Validate response
    if (!explanation) throw new Error('Missing explanation section');
    if (codeExamples.length === 0) throw new Error('Missing code examples');
    if (tips.length < 3) throw new Error('Insufficient tips provided');
    if (bestPractices.length < 3) throw new Error('Insufficient best practices provided');

    return {
      explanation,
      codeExamples,
      tips,
      bestPractices,
    };
  } catch (error) {
    console.error('Error parsing OpenAI response:', error);
    throw new Error('Failed to parse OpenAI response. Please try again.');
  }
}