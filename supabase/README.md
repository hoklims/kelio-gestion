# Configuration Supabase

Ce dossier contient les scripts et instructions pour configurer votre base de données Supabase.

## Fichiers

- `init.sql` - Script d'initialisation de la base de données

## Instructions de configuration

### 1. Exécuter le script d'initialisation

1. Connectez-vous à votre dashboard Supabase
2. Allez dans **SQL Editor**
3. Cliquez sur **New Query**
4. Copiez le contenu de `init.sql`
5. Cliquez sur **Run** pour exécuter

### 2. Vérifier la création des tables

Après exécution, vous devriez voir ces tables dans l'onglet **Table Editor** :

- `profiles` - Profils utilisateurs
- `clients` - Informations clients
- `missions` - Données des missions
- `commission_settings` - Paramètres de commission
- `objectives` - Objectifs mensuels

### 3. Configuration des politiques RLS

Le script configure automatiquement les politiques de sécurité Row Level Security (RLS) :

- Isolation des données par utilisateur
- Accès sécurisé aux ressources
- Protection contre les accès non autorisés

### 4. Triggers et fonctions

Le script crée également :

- Fonction de mise à jour automatique des timestamps
- Création automatique de profil lors de l'inscription
- Paramètres de commission par défaut

## Test de configuration

Une fois configuré, vous pouvez tester la connexion en :

1. Créant un compte utilisateur
2. Vérifiant la création automatique du profil
3. Ajoutant un premier client

## Support

En cas de problème :

1. Vérifiez les logs Supabase dans l'onglet **Logs**
2. Consultez la documentation RLS
3. Vérifiez les variables d'environnement
