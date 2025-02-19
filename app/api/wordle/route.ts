import { NextResponse } from 'next/server';
import { getFormattedDate } from '@/lib/utils/date';
import { VALID_WORDS, addValidWord } from '@/lib/games/wordle';

export async function GET() {
  try {
    const date = new Date();
    const estDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const formattedDate = getFormattedDate(estDate);
    
    const response = await fetch(
      `https://www.nytimes.com/svc/wordle/v2/${formattedDate}.json`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const solution = data.solution.toLowerCase();

    // Add the word to our valid words list if it's not already there
    addValidWord(solution);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Wordle data' },
      { status: 500 }
    );
  }
} 