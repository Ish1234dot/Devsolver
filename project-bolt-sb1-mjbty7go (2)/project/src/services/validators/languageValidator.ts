import { ProgrammingLanguage } from '../../types';
import { LANGUAGE_VALIDATORS } from '../constants/languages';

export function validateLanguageQuery(query: string, language: ProgrammingLanguage): boolean {
  const normalizedQuery = query.toLowerCase();
  
  // Check if query explicitly mentions a different language
  const otherLanguages = Object.keys(LANGUAGE_VALIDATORS).filter(lang => lang !== language);
  for (const otherLang of otherLanguages) {
    if (normalizedQuery.includes(otherLang)) {
      throw new Error(`This question appears to be about ${otherLang}. Please select ${otherLang} from the language dropdown.`);
    }
  }

  // For CSS-specific validation
  if (language === 'css') {
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