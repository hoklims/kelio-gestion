# 🌐 Accès Web Sécurisé - Kelio Gestion

## URL Publique
**https://337d212b79b6.ngrok-free.app**

## Authentification Admin
- **Nom d'utilisateur** : `admin`
- **Mot de passe** : `kelio2024!`

## Sécurité Implémentée

### 🔐 Authentification
- Système d'authentification custom avec hachage bcrypt
- Sessions JWT sécurisées avec cookies HttpOnly
- Redirection automatique vers login pour les utilisateurs non authentifiés
- Logout sécurisé avec invalidation de session

### 🛡️ Protection et Rate Limiting
- Rate limiting : 5 tentatives par minute par IP
- Headers de sécurité : HSTS, CSP, X-Frame-Options, etc.
- Protection CSRF avec tokens sécurisés
- Middleware de sécurité global

### 🔒 Variables d'Environnement Sécurisées
- `ADMIN_USERNAME` : Nom d'utilisateur admin
- `ADMIN_PASSWORD_HASH` : Hash bcrypt sécurisé
- `JWT_SECRET` : Secret pour la signature JWT
- `IRON_SESSION_PASSWORD` : Clé pour les sessions
- `RATE_LIMIT_MAX` : Limite du rate limiting

## Fonctionnalités Accessibles

### 📊 Dashboard
- Vue d'ensemble des métriques
- Graphiques financiers
- Objectifs mensuels

### 👥 Clients
- Gestion des clients
- Création/modification/archivage
- Historique des missions

### 📋 Missions
- Suivi des missions
- Statuts et deadlines
- Calcul des commissions

### 💰 Finances
- Tableau de bord financier
- Suivi des revenus
- Analyse des commissions

### 🎯 Objectifs
- Définition des objectifs mensuels
- Suivi des performances
- Indicateurs de progression

## Status du Serveur

### Next.js Development Server
- **Port Local** : 3002
- **Status** : ✅ En ligne
- **Environnement** : Development

### Ngrok Tunnel
- **URL Publique** : https://337d212b79b6.ngrok-free.app
- **Status** : ✅ Actif
- **Région** : Europe (eu)
- **Type** : Tunnel HTTP gratuit

## Instructions d'Utilisation

1. **Accès Initial**
   - Ouvrez https://337d212b79b6.ngrok-free.app dans votre navigateur
   - Vous serez automatiquement redirigé vers la page de login

2. **Connexion**
   - Utilisateur : `admin`
   - Mot de passe : `kelio2024!`
   - Cliquez sur "Se connecter"

3. **Navigation**
   - Utilisez le menu de navigation pour accéder aux différentes sections
   - Bouton de déconnexion disponible en haut à droite

## Surveillance et Maintenance

### Logs d'Accès
- Vérifiez les logs dans le terminal Next.js
- Surveillez les tentatives de connexion suspectes

### Renouvellement URL
- L'URL ngrok gratuite change à chaque redémarrage
- Pour une URL permanente, mise à niveau vers ngrok Pro

### Sécurité Continue
- Changement régulier des mots de passe
- Mise à jour des dépendances de sécurité
- Surveillance des tentatives d'intrusion

## Arrêt du Service

Pour arrêter le service :
1. Appuyez sur `Ctrl+C` dans le terminal ngrok
2. Arrêtez le serveur Next.js avec `Ctrl+C`

---

**🔐 Application déployée avec succès et sécurisée !**
