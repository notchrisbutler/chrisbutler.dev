import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const word = searchParams.get('word');

  if (!word) {
    return NextResponse.json(
      { error: 'Word parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    return NextResponse.json({ isValid: response.ok });
  } catch (error) {
    console.error('Error validating word:', error);
    return NextResponse.json(
      { error: 'Failed to validate word' },
      { status: 500 }
    );
  }
} 