import { CodeResponse, CodeExample } from '../../types';

export function parseOpenAIResponse(content: string): CodeResponse {
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