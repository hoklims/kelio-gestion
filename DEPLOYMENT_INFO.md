# Déploiement Kelio Gestion

## 🌐 Accès Public

**URL de Production:** https://14ccbcaabf13.ngrok-free.app

## 🔐 Authentification Admin

**Nom d'utilisateur:** `admin`
**Mot de passe:** `admin123`

## 🛡️ Sécurité Implémentée

### Authentification
- Système d'authentification custom avec bcrypt
- Sessions JWT sécurisées (durée: 24h)
- Cookies httpOnly sécurisés
- Hashage sécurisé des mots de passe

### Protection des Routes
- Middleware Next.js pour toutes les routes
- Redirection automatique vers `/login` si non authentifié
- Protection de toutes les pages du dashboard

### Rate Limiting
- Limite: 100 requêtes par 15 minutes par IP
- Protection contre les attaques par déni de service
- Limitation spécifique sur les endpoints d'authentification

### Headers de Sécurité
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## 🚀 Démarrage

### Serveur Local
```bash
npm run dev
```

### Exposition via ngrok
```bash
npx ngrok http 3000
```

## 📁 Structure de Sécurité

### Fichiers Clés
- `middleware.ts` - Protection des routes et headers de sécurité
- `src/lib/auth.ts` - Système d'authentification
- `src/app/api/auth/` - Endpoints d'authentification
- `src/app/login/` - Page de connexion
- `src/components/logout-button.tsx` - Déconnexion

### Variables d'Environnement
- `ADMIN_USERNAME` - Nom d'utilisateur admin
- `ADMIN_PASSWORD_HASH` - Hash bcrypt du mot de passe
- `SESSION_SECRET` - Secret pour les sessions
- `NEXTAUTH_SECRET` - Secret NextAuth
- `ENCRYPTION_KEY` - Clé de chiffrement
- `RATE_LIMIT_MAX` - Limite de requêtes
- `RATE_LIMIT_WINDOW` - Fenêtre de temps pour le rate limiting

## 🔄 Mise à Jour

Pour changer le mot de passe admin :
1. Modifier le script `generate-password-hash.js`
2. Relancer le script
3. Mettre à jour `.env.local` avec le nouveau hash
4. Redémarrer l'application

## 📊 Monitoring

- Interface web ngrok : http://127.0.0.1:4040
- Logs en temps réel via les devtools Next.js
- Surveillance des tentatives de connexion

## ⚠️ Notes Importantes

- L'URL ngrok change à chaque redémarrage (version gratuite)
- Pour une URL fixe, utiliser ngrok Pro
- En production, utiliser HTTPS uniquement
- Changer tous les secrets en production
- Sauvegarder régulièrement la base de données Supabase

## 🎯 Fonctionnalités Accessibles

Une fois connecté, l'utilisateur admin a accès à :
- Dashboard avec KPIs et graphiques
- Gestion des clients
- Suivi des missions
- Gestion financière
- Objectifs mensuels
- Administration

## 🔗 Liens Utiles

- [Repository GitHub](https://github.com/hoklims/kelio-gestion)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation ngrok](https://ngrok.com/docs)
