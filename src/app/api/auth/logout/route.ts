/**
 * API Route de déconnexion
 */

import { NextResponse } from 'next/server';
import { clearSessionResponse } from '@/lib/auth';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });
    return clearSessionResponse(response);
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la déconnexion' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Méthode non autorisée' },
    { status: 405 }
  );
}
