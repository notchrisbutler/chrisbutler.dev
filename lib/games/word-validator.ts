// Cache for validated words to avoid repeated API calls
const validationCache = new Map<string, boolean>();

export class WordValidator {
  private validWordsList: Set<string>;

  constructor(words: string[] = []) {
    this.validWordsList = new Set(words.map(word => word.toLowerCase()));
  }

  async isValidWord(word: string): Promise<boolean> {
    const normalizedWord = word.toLowerCase();

    // First check if it's in our game's word list
    if (this.validWordsList.has(normalizedWord)) {
      return true;
    }

    // Then check our cache
    if (validationCache.has(normalizedWord)) {
      return validationCache.get(normalizedWord)!;
    }

    try {
      // Use our internal API to validate the word
      const response = await fetch(`/api/validate-word?word=${normalizedWord}`);
      if (!response.ok) {
        throw new Error('Failed to validate word');
      }
      
      const data = await response.json();
      const isValid = data.isValid;
      
      // Cache the result
      validationCache.set(normalizedWord, isValid);
      
      return isValid;
    } catch (error) {
      console.warn('Failed to validate word with API:', error);
      // Fallback to our word list in case of API failure
      return this.validWordsList.has(normalizedWord);
    }
  }

  addWord(word: string): void {
    const normalizedWord = word.toLowerCase();
    this.validWordsList.add(normalizedWord);
    // Also add to cache
    validationCache.set(normalizedWord, true);
  }
} 