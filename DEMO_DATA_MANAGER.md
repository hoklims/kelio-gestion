# 🎭 Gestionnaire de Données Demo

Ce système vous permet de charger et vider facilement des données mockup pour vos démonstrations de l'application Kelio Gestion.

## 🚀 Fonctionnalités

### ✅ Chargement des données demo

- **5 clients** avec profils variés (TechCorp, StartupInnovante, etc.)
- **8 missions** avec différents statuts (en cours, terminée, planifiée)
- **6 objectifs** mensuels avec targets réalistes
- **2 configurations** de commission
- **5 notes** attachées aux clients et missions

### 🧹 Nettoyage des données
- Suppression complète de toutes vos données
- Respect des contraintes de clés étrangères
- Action irréversible et sécurisée par confirmation

## 📱 Interface Web

### Accès
Rendez-vous sur `/demo` dans votre tableau de bord ou cliquez sur "Demo" dans la navigation latérale.

### Utilisation
1. **Charger les données** : Bouton vert "Charger Demo"
2. **Vider les données** : Bouton rouge "Vider Tout" (avec confirmation)
3. **Résultats** : Affichage détaillé des actions effectuées

## 🔧 API Endpoints

### POST `/api/demo/load`
Charge toutes les données mockup dans votre compte.

**Réponse succès :**
```json
{
  "success": true,
  "message": "Données mockup chargées avec succès",
  "data": {
    "clients": 5,
    "missions": 8,
    "objectives": 6,
    "commission_settings": 2,
    "notes": 5
  }
}
```

### DELETE `/api/demo/clear`
Supprime toutes vos données.

**Réponse succès :**
```json
{
  "success": true,
  "message": "Toutes les données ont été supprimées avec succès",
  "data": {
    "clients": 5,
    "missions": 8,
    "objectives": 6,
    "commission_settings": 2,
    "notes": 5
  }
}
```

## 🧪 Test en ligne de commande

Un script de test est fourni : `test-demo-api.js`

### Utilisation
```bash
# Test complet (chargement puis nettoyage)
node test-demo-api.js

# Charger uniquement les données
node test-demo-api.js --load

# Vider uniquement les données
node test-demo-api.js --clear
```

### Prérequis
- Serveur Next.js démarré (`npm run dev`)
- Configuration Supabase valide
- Utilisateur authentifié

## 📊 Données Mockup Détaillées

### Clients (5)
| Nom | Email | Ville | Type |
|-----|-------|-------|------|
| TechCorp Solutions | contact@techcorp.com | Paris | Enterprise |
| StartupInnovante | hello@startupinnovante.fr | Lyon | Startup |
| Grand Groupe International | projets@grandgroupe.com | Paris | Multinational |
| PME Familiale | direction@pmefamiliale.fr | Marseille | PME |
| Association EcoTech | contact@ecotech-asso.org | Toulouse | Association |

### Missions (8)
| Titre | Montant | Statut | Client |
|-------|---------|--------|--------|
| App Mobile E-commerce | 45 000€ | En cours | TechCorp |
| Refonte Site Web | 28 000€ | Planifiée | StartupInnovante |
| Système de Gestion | 120 000€ | En cours | Grand Groupe |
| Boutique en Ligne | 18 000€ | Terminée | PME Familiale |
| Plateforme Collaborative | 35 000€ | En cours | Association |
| Migration Cloud | 55 000€ | Planifiée | TechCorp |
| Application IoT | 40 000€ | En cours | StartupInnovante |
| Audit Sécurité | 15 000€ | Terminée | Grand Groupe |

### Objectifs Mensuels (6)
- **Juillet 2025** : 150K€ CA, 8 missions, 3 nouveaux clients
- **Août 2025** : 180K€ CA, 10 missions, 4 nouveaux clients
- **Septembre 2025** : 200K€ CA, 12 missions, 5 nouveaux clients
- **Octobre 2025** : 170K€ CA, 9 missions, 3 nouveaux clients
- **Novembre 2025** : 220K€ CA, 14 missions, 6 nouveaux clients
- **Décembre 2025** : 250K€ CA, 15 missions, 7 nouveaux clients

## 🔒 Sécurité

- **Isolation utilisateur** : Seules vos données sont affectées
- **Authentification** : APIs protégées par session Supabase
- **Confirmation** : Double validation pour les suppressions
- **Logs** : Toutes les opérations sont tracées

## 🎯 Cas d'usage

### 💼 Démonstrations commerciales
1. Charger les données avant la démo
2. Montrer toutes les fonctionnalités avec des données réalistes
3. Vider après la démo pour un environnement propre

### 🧪 Tests et développement
1. Créer rapidement un jeu de données cohérent
2. Tester les fonctionnalités avec des données variées
3. Reset rapide entre les sessions de test

### 📚 Formation et onboarding
1. Préparer un environnement de formation
2. Permettre aux nouveaux utilisateurs de découvrir l'app
3. Éviter la confusion avec des données vides

## ⚠️ Avertissements

- **Action irréversible** : Le nettoyage supprime définitivement vos données
- **Données personnelles** : Ne chargez les données demo que sur des comptes de test
- **Performance** : Le chargement peut prendre quelques secondes selon la connexion
- **Conflits** : Évitez de charger les données demo s'il y a déjà du contenu

## 🆘 Support

En cas de problème :
1. Vérifiez la configuration Supabase
2. Consultez les logs de la console navigateur
3. Vérifiez que vous êtes bien authentifié
4. Testez avec le script CLI pour isoler le problème
