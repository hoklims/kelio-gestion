# Migration vers le système de couleurs Oklab

## 🎨 Résumé de la refonte

Le projet Kelio Gestion a été migré vers un nouveau système de couleurs basé sur **Oklab/CAM16** pour une expérience visuelle plus cohérente et accessible.

## ✅ Composants mis à jour

### Composants principaux refactorisés
- ✅ **Button** (`src/components/ui/button.tsx`) - Utilise maintenant le hook `useThemeColor`
- ✅ **Card** (`src/components/ui/card.tsx`) - Couleurs dynamiques avec le système Oklab
- ✅ **StatusBadge** (`src/components/ui/status-badge.tsx`) - Statuts sémantiques colorés

### Nouvelles pages créées
- ✅ **Design Showcase** (`/design-showcase`) - Démonstration complète du système
- ✅ **Color System Demo** (`/color-system-demo`) - Test des palettes Oklab

## 📁 Structure du système de couleurs

```
src/lib/design-system/
├── colors.ts          # Système principal Oklab/CAM16
├── theme.ts           # Configuration du thème
└── variables.css      # Variables CSS générées

src/hooks/
└── use-theme-color.ts # Hook React pour accéder aux couleurs

src/components/ui/
├── button.tsx         # Bouton refactorisé
├── card.tsx          # Cartes refactorisées
├── status-badge.tsx  # Badges refactorisés
├── button-oklab.tsx  # Version de test (à supprimer)
└── status-badge-oklab.tsx # Version de test (à supprimer)
```

## 🔧 Comment utiliser le nouveau système

### Dans un composant React

```tsx
import { useThemeColor } from '@/hooks/use-theme-color'

function MonComposant() {
  const { getButtonColors, getStatusColor, getSemanticColor } = useThemeColor();
  
  const buttonColors = getButtonColors('primary');
  
  return (
    <button 
      style={{
        backgroundColor: buttonColors.bg,
        color: buttonColors.text
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = buttonColors.hover;
      }}
    >
      Mon bouton
    </button>
  );
}
```

### Composants disponibles

```tsx
// Boutons avec variants
<Button variant="primary">Action principale</Button>
<Button variant="secondary">Action secondaire</Button>
<Button variant="danger">Action dangereuse</Button>
<Button variant="outline">Bouton outlined</Button>
<Button variant="ghost">Bouton fantôme</Button>

// Badges de statut
<StatusBadge status="completed" />
<StatusBadge status="pending" />
<StatusBadge status="in_progress" />
<StatusBadge status="paid" />
<StatusBadge status="overdue" />
<StatusBadge status="draft" />

// Cartes avec couleurs automatiques
<Card>
  <CardHeader>
    <CardTitle>Titre</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Contenu</CardContent>
</Card>
```

## 🎯 Palette de couleurs générée

Le système génère automatiquement des palettes cohérentes pour :

### Couleurs de marque
- **Primary** : Bleu (500 nuances : 50-950)
- **Secondary** : Orange (500 nuances : 50-950)  
- **Accent** : Teal (500 nuances : 50-950)

### Couleurs sémantiques
- **Success** : Vert
- **Warning** : Jaune/Ambre
- **Error** : Rouge
- **Info** : Bleu clair
- **Neutral** : Gris

### Couleurs système
- **Surface** : Arrière-plans et cartes
- **Text** : Textes avec hiérarchie
- **Border** : Bordures et séparateurs
- **Interactive** : États hover/active

## 🧪 Test et débogage

### Page de démonstration
Visitez `/design-showcase` pour voir tous les composants en action.

### Debug dans la console
```tsx
import { debugColors, testColorGeneration } from '@/lib/design-system/colors'

// Dans la console du navigateur
debugColors(); // Affiche toutes les couleurs générées
testColorGeneration(); // Test de la génération des palettes
```

### Vérification des contrastes
Le système assure automatiquement des contrastes WCAG AA/AAA grâce à Oklab.

## 🔄 Migration des composants existants

### Composants à migrer
Les composants suivants utilisent encore l'ancien système :

```bash
# Rechercher les anciennes références
grep -r "bg-primary" src/
grep -r "text-muted-foreground" src/
grep -r "border-border" src/
```

### Pattern de migration

**Avant :**
```tsx
<div className="bg-primary text-primary-foreground border-border">
  Contenu
</div>
```

**Après :**
```tsx
function MonComposant() {
  const { getSemanticColor } = useThemeColor();
  
  return (
    <div 
      style={{
        backgroundColor: getSemanticColor('surface', 'default'),
        color: getSemanticColor('text', 'default'),
        borderColor: getSemanticColor('border', 'default')
      }}
    >
      Contenu
    </div>
  );
}
```

## 📋 Checklist de migration

### ✅ Complété
- [x] Système de couleurs Oklab/CAM16 implémenté
- [x] Hook `useThemeColor` créé
- [x] Composants Button, Card, StatusBadge migrés
- [x] Page de démonstration créée
- [x] Variables CSS intégrées dans Tailwind
- [x] Documentation Copilot mise à jour

### 🔄 En cours
- [ ] Migration des pages principales (dashboard, clients, missions)
- [ ] Nettoyage des anciens composants de test
- [ ] Optimisation des performances

### 📋 À faire
- [ ] Migration complète de toutes les pages
- [ ] Tests d'accessibilité complets
- [ ] Support du mode sombre amélioré
- [ ] Documentation utilisateur finale

## 🚀 Avantages du nouveau système

### 🎨 Design
- **Perception uniforme** : Les nuances sont perçues de manière égale par l'œil humain
- **Harmonie visuelle** : Transitions naturelles entre les couleurs
- **Cohérence** : Même rendu sur différents écrans

### ♿ Accessibilité
- **Contrastes optimisés** : Ratios WCAG AA/AAA automatiques
- **Lisibilité** : Texte plus lisible sur tous les arrière-plans
- **Adaptation** : Meilleure gestion du mode sombre

### 🛠️ Développement
- **Maintenance** : Système centralisé et facile à maintenir
- **Extensibilité** : Ajout facile de nouvelles couleurs
- **Performance** : Génération optimisée des palettes
- **DX** : Intégration Copilot améliorée avec semantic tokens

## 📞 Support

Pour toute question sur la migration ou l'utilisation du nouveau système :
1. Consultez `/design-showcase` pour les exemples
2. Vérifiez la console pour les erreurs de couleurs
3. Référez-vous à `DESIGN_SYSTEM.md` pour la documentation complète
