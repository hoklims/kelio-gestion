/**
 * Système d'authentification sécurisé pour admin unique
 * Utilise bcrypt pour le hachage des mots de passe
 */

import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

// Configuration sécurisée
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';
const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback-secret-key';
const JWT_SECRET = new TextEncoder().encode(SESSION_SECRET);

// Durée de session (24 heures)
const SESSION_DURATION = 24 * 60 * 60 * 1000;

export interface AdminUser {
  id: string;
  username: string;
  role: 'admin';
  loginTime: number;
}

/**
 * Génère un hash bcrypt pour un mot de passe
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Vérifie un mot de passe contre son hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Authentifie l'utilisateur admin
 */
export async function authenticateAdmin(username: string, password: string): Promise<AdminUser | null> {
  if (!ADMIN_PASSWORD_HASH) {
    console.error('ADMIN_PASSWORD_HASH not configured');
    return null;
  }

  if (username !== ADMIN_USERNAME) {
    return null;
  }

  const isValid = await verifyPassword(password, ADMIN_PASSWORD_HASH);
  if (!isValid) {
    return null;
  }

  return {
    id: 'admin',
    username: ADMIN_USERNAME,
    role: 'admin',
    loginTime: Date.now()
  };
}

/**
 * Crée un token JWT pour la session
 */
export async function createSessionToken(user: AdminUser): Promise<string> {
  const token = await new SignJWT({
    id: user.id,
    username: user.username,
    role: user.role,
    loginTime: user.loginTime
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Date.now() + SESSION_DURATION)
    .sign(JWT_SECRET);

  return token;
}

/**
 * Vérifie et décode un token JWT
 */
export async function verifySessionToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Vérifier l'expiration
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }

    return {
      id: payload.id as string,
      username: payload.username as string,
      role: payload.role as 'admin',
      loginTime: payload.loginTime as number
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Extrait le token de session des cookies
 */
export function getSessionToken(request: NextRequest): string | null {
  return request.cookies.get('session-token')?.value || null;
}

/**
 * Crée une réponse avec cookie de session
 */
export function createSessionResponse(token: string, response: NextResponse): NextResponse {
  response.cookies.set('session-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_DURATION / 1000,
    path: '/'
  });

  return response;
}

/**
 * Supprime le cookie de session
 */
export function clearSessionResponse(response: NextResponse): NextResponse {
  response.cookies.delete('session-token');
  return response;
}

/**
 * Middleware d'authentification
 */
export async function requireAuth(request: NextRequest): Promise<AdminUser | null> {
  const token = getSessionToken(request);
  
  if (!token) {
    return null;
  }

  const user = await verifySessionToken(token);
  return user;
}

/**
 * Génère un hash de mot de passe pour la configuration
 */
export async function generatePasswordHash(password: string): Promise<void> {
  const hash = await hashPassword(password);
  console.log('Password hash for .env:', hash);
  console.log('Add this to your .env file:');
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
}
