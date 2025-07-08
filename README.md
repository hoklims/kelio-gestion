# Kelio Gestion 🚀

Une application moderne de gestion de clients et missions construite avec Next.js 14, TypeScript, Tailwind CSS et Supabase.

## � Fonctionnalités

### 🎯 Gestion des clients
- Création, modification et archivage de clients
- Système de notes et historique
- Interface responsive avec design moderne

### 📊 Gestion des missions
- Suivi des missions avec deadlines et montants
- Statuts : En attente, En cours, Terminée, Payée
- Calcul automatique des commissions

### 💰 Tableau de bord financier
- Graphiques interactifs avec Recharts
- Suivi du chiffre d'affaires
- Indicateurs de performance (KPIs)

### 🎯 Objectifs mensuels
- Définition d'objectifs de missions et revenus
- Suivi des performances par mois
- Visualisation des progrès

### 👥 Système de commissions
- Configuration des pourcentages par utilisateur
- Calcul automatique des commissions
- Rapports détaillés

## 🛠️ Stack Technique

### Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **Radix UI** - Composants UI accessibles
- **Lucide React** - Icônes modernes
- **Recharts** - Graphiques et visualisations

### Backend
- **Supabase** - Base de données PostgreSQL
- **Row Level Security (RLS)** - Sécurité des données
- **Real-time subscriptions** - Mises à jour en temps réel

### Design System
- **Oklab/CAM16** - Système de couleurs perceptuellement uniforme
- **Glassmorphism** - Effets de transparence modernes
- **Micro-interactions** - Animations fluides
- **Responsive Design** - Mobile-first
- **Charts** : Recharts
- **Déploiement** : Vercel (gratuit)

## 📦 Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd kelio-gestion
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration Supabase**
   - Créez un compte sur [Supabase](https://supabase.com)
   - Créez un nouveau projet
   - Copiez l'URL et la clé anonyme depuis Settings > API
   - Renommez `.env.local.example` en `.env.local` et ajoutez :

```env
NEXT_PUBLIC_SUPABASE_URL=votre-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
```

4. **Initialiser la base de données**
   - Dans le dashboard Supabase, allez dans SQL Editor
   - Exécutez le script `supabase/init.sql`

## ⚠️ Résolution des erreurs

Si vous voyez l'erreur `Erreur lors du chargement des statistiques: {}` ou des messages similaires, cela signifie que la base de données n'est pas encore configurée.

**Solution rapide :**
1. Connectez-vous à [supabase.com/dashboard](https://supabase.com/dashboard)
2. Ouvrez l'éditeur SQL de votre projet
3. Copiez et exécutez le contenu du fichier `supabase/init.sql`
4. Rechargez l'application

Pour plus de détails, consultez le [Guide de dépannage](TROUBLESHOOTING.md).

**L'application affiche maintenant des messages d'erreur clairs avec :**
- Instructions détaillées pour configurer la base de données
- Boutons pour réessayer ou aller directement à Supabase
- Guide étape par étape pour résoudre les problèmes

5. **Lancer le serveur de développement**
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🔧 Configuration

### Première utilisation

1. **Créer un compte utilisateur** via l'interface de login
2. **Configurer les commissions** dans les paramètres
3. **Ajouter vos premiers clients**
4. **Créer vos premières missions**
5. **Définir vos objectifs mensuels**

### Rôles utilisateurs

- **Admin** : Accès complet à toutes les fonctionnalités
- **Commercial** : Gestion clients et missions, visualisation finances
- **Developer** : Visualisation des données et commissions

## 📊 Structure de la base de données

```sql
profiles          -- Profils utilisateurs
├── id (UUID)
├── email
├── full_name
├── role
└── timestamps

clients           -- Clients
├── id (UUID)
├── name
├── email
├── phone
├── company
├── notes
├── archived
└── timestamps

missions          -- Missions
├── id (UUID)
├── title
├── description
├── client_id (FK)
├── deadline
├── total_amount
├── advance_amount
├── status
├── notes
└── timestamps

commission_settings -- Paramètres de commission
├── id (UUID)
├── user_id (FK)
├── commission_percentage
└── timestamps

objectives        -- Objectifs mensuels
├── id (UUID)
├── month
├── year
├── target_missions
├── target_revenue
└── timestamps
```

## 🚀 Déploiement

### Déploiement sur Vercel (Gratuit)

1. **Connecter votre repository GitHub**
2. **Importer sur Vercel** : [vercel.com/new](https://vercel.com/new)
3. **Configurer les variables d'environnement** :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Déployer** : Le site sera accessible sur `votre-app.vercel.app`

### Mise à jour

```bash
git push origin main  # Auto-déploiement via Vercel
```

## 📱 Utilisation

### Gestion des clients
- Ajoutez vos clients avec leurs informations complètes
- Organisez par entreprise, email, téléphone
- Ajoutez des notes personnalisées
- Archivez les anciens clients

### Suivi des missions
- Créez des missions liées à vos clients
- Définissez montants, acomptes, échéances
- Suivez le statut : En attente → En cours → Terminé → Payé
- Calculez automatiquement les commissions

### Tableau de bord financier
- Visualisez votre CA total et encaissé
- Suivez les montants à encaisser
- Analysez l'évolution mensuelle
- Consultez la répartition des commissions

### Objectifs mensuels
- Définissez vos objectifs de missions et CA
- Suivez votre progression en temps réel
- Analysez vos performances passées

## 🎨 Personnalisation

### Couleurs et thème
Modifiez les variables CSS dans `src/app/globals.css`

### Commissions
Ajustez les pourcentages par défaut dans `supabase/init.sql`

### Ajout de fonctionnalités
- Nouvelles pages dans `src/app/(dashboard)/`
- Composants UI dans `src/components/ui/`
- Types TypeScript dans `src/lib/supabase.ts`

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Support

Pour toute question ou problème :
1. Consultez la documentation Supabase
2. Vérifiez les logs dans la console du navigateur
3. Contactez l'équipe de développement

---

**Développé avec ❤️ pour optimiser votre gestion commerciale**
