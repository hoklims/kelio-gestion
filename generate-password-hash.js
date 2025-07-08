#!/usr/bin/env node

/**
 * Script pour générer le hash du mot de passe admin
 * Usage: node generate-password-hash.js [password]
 */

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

async function generatePasswordHash(password) {
  const saltRounds = 12;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

function generateSecrets() {
  const sessionSecret = crypto.randomBytes(32).toString('hex');
  const encryptionKey = crypto.randomBytes(32).toString('hex');
  const nextAuthSecret = crypto.randomBytes(32).toString('hex');
  
  return { sessionSecret, encryptionKey, nextAuthSecret };
}

async function main() {
  const password = process.argv[2] || 'admin123';
  
  console.log('🔐 Génération des secrets de sécurité pour Kelio Gestion\n');
  
  // Générer le hash du mot de passe
  const passwordHash = await generatePasswordHash(password);
  
  // Générer les secrets
  const { sessionSecret, encryptionKey, nextAuthSecret } = generateSecrets();
  
  console.log('📋 Ajoutez ces variables à votre fichier .env.local :\n');
  console.log('# Admin Authentication');
  console.log('ADMIN_USERNAME=admin');
  console.log(`ADMIN_PASSWORD_HASH=${passwordHash}`);
  console.log('');
  console.log('# Security Secrets');
  console.log(`SESSION_SECRET=${sessionSecret}`);
  console.log(`NEXTAUTH_SECRET=${nextAuthSecret}`);
  console.log(`ENCRYPTION_KEY=${encryptionKey}`);
  console.log('');
  console.log('# Other Settings');
  console.log('NEXTAUTH_URL=http://localhost:3000');
  console.log('RATE_LIMIT_MAX=100');
  console.log('RATE_LIMIT_WINDOW=900000');
  console.log('');
  console.log('⚠️  IMPORTANT:');
  console.log('- Gardez ces secrets confidentiels');
  console.log('- Ne les commitez jamais dans Git');
  console.log('- Changez-les en production');
  console.log(`- Mot de passe utilisé: ${password}`);
  console.log('');
  console.log('🚀 Votre application est maintenant sécurisée !');
}

main().catch(console.error);
