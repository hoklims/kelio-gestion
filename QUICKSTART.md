# 🚀 Guide de Démarrage Rapide - Kelio Gestion

## Configuration Supabase (5 minutes)

### 1. Créer un compte Supabase
- Allez sur [supabase.com](https://supabase.com)
- Cliquez sur "Start your project"
- Inscrivez-vous gratuitement

### 2. Créer un nouveau projet
- Cliquez sur "New Project"
- Nom du projet : `kelio-gestion`
- Mot de passe de base de données : (générez-en un sécurisé)
- Région : Europe West (proche de la France)
- Cliquez sur "Create new project"

### 3. Récupérer les clés d'API
- Une fois le projet créé, allez dans **Settings** → **API**
- Copiez :
  - **Project URL** (https://xxx.supabase.co)
  - **Public anon key** (commence par eyJ...)

### 4. Configurer les variables d'environnement
Créez/modifiez le fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-publique-anonyme
```

### 5. Initialiser la base de données
- Dans Supabase, allez dans **SQL Editor**
- Cliquez sur "New Query"
- Copiez-collez le contenu du fichier `supabase/init.sql`
- Cliquez sur "Run" pour exécuter le script

### 6. Lancer l'application
```bash
npm run dev
```

## ✅ Première utilisation

1. **Créer un compte** : Accédez à http://localhost:3000
2. **Se connecter** : Utilisez vos identifiants
3. **Ajouter des clients** : Commencez par la page Clients
4. **Créer des missions** : Liez-les à vos clients
5. **Définir des objectifs** : Page Objectifs pour le suivi

## 🎯 Fonctionnalités principales

- **Clients** : Gestion complète avec notes et archivage
- **Missions** : Suivi des statuts, montants, échéances
- **Finances** : Graphiques CA, commissions, évolution
- **Objectifs** : Définition et suivi mensuel

## 🚀 Déploiement (optionnel)

Pour héberger gratuitement sur Vercel :
1. Pushez votre code sur GitHub
2. Importez sur [vercel.com](https://vercel.com)
3. Ajoutez les mêmes variables d'environnement
4. Déployez : accessible sur `votre-app.vercel.app`

## 💡 Support

- Documentation Supabase : [docs.supabase.com](https://docs.supabase.com)
- Problèmes de configuration : Vérifiez les variables d'environnement
- Console navigateur : F12 pour voir les erreurs

---

**Temps de setup total : ~5 minutes** ⏱️
