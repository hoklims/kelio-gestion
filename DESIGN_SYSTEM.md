# Kelio Gestion Design System - Oklab/CAM16

## Overview
This design system uses Oklab/CAM16 color space for perceptually uniform colors, ensuring consistent visual appearance across different shades and combinations.

## Color System

### Why Oklab?
- **Perceptual uniformity**: Equal steps in lightness appear equal to human vision
- **Better color mixing**: More natural color interpolation
- **Consistent contrast**: Predictable contrast ratios across the spectrum

### Usage

#### In Components
```tsx
import { useThemeColor } from '@/hooks/use-theme-color';

function MyComponent() {
  const { getSemanticColor, getButtonColors } = useThemeColor();
  
  return (
    <div style={{ 
      backgroundColor: getSemanticColor('surface', 'default'),
      color: getSemanticColor('text', 'default')
    }}>
      Content
    </div>
  );
}
```

#### With Tailwind
```tsx
// Use generated color classes
<div className="bg-primary-500 text-neutral-0">
  Primary button
</div>

// Use semantic classes (when custom CSS is added)
<div className="bg-surface text-default border-default">
  Card content
</div>
```

### Color Tokens Reference

#### Surface Colors
- `surface.default` - Default surface (cards, modals) - White
- `surface.subtle` - Subtle background - Neutral 50
- `surface.muted` - Muted sections - Neutral 100
- `surface.elevated` - Elevated elements - White

#### Text Colors
- `text.default` - Primary text - Neutral 900
- `text.subtle` - Secondary text - Neutral 600
- `text.muted` - Disabled/placeholder - Neutral 500
- `text.brand` - Brand colored text - Primary 600

#### Status Colors
- `status.success` - Success states - Green
- `status.warning` - Warning states - Yellow
- `status.error` - Error states - Red
- `status.info` - Info states - Blue
- `status.neutral` - Neutral states - Neutral 500

#### Button Colors
Available variants: `primary`, `secondary`, `danger`
Each variant includes: `bg`, `hover`, `active`, `text`

```tsx
const { getButtonColors } = useThemeColor();
const primaryButton = getButtonColors('primary');
// Returns: { bg, hover, active, text }
```

## GitHub Copilot Integration

When working with colors, Copilot understands:

### Semantic Patterns
```tsx
// ✅ Good - Copilot understands these patterns
<Button variant="primary">Save</Button>
<StatusBadge status="success">Complete</StatusBadge>
<Card className="bg-surface border-default">Content</Card>

// ✅ Copilot suggests correct color tokens
const { getStatusColor } = useThemeColor();
const successColor = getStatusColor('success');
```

### Context-Aware Suggestions
- **Buttons**: Suggests `primary`, `secondary`, `danger` variants
- **Status indicators**: Suggests `success`, `warning`, `error`, `info`
- **Surfaces**: Suggests `default`, `subtle`, `muted`, `elevated`
- **Text**: Suggests `default`, `subtle`, `muted`, `brand`

### Example Prompts for Copilot
- "Create a success notification with proper colors"
- "Add a primary button with hover states"
- "Style this card with elevated surface colors"
- "Create a warning status badge"

## GitHub Copilot Instructions

### Color Usage Guidelines

When GitHub Copilot generates code for Kelio Gestion, it should:

1. **Use semantic color tokens** instead of hardcoded colors
2. **Follow the established patterns** for button variants, status colors, and surface colors
3. **Apply consistent naming conventions** for color-related props and classes
4. **Consider accessibility** when suggesting color combinations
5. **Maintain brand consistency** by using the defined color palette

### Integration with Copilot

The design system is specifically structured to be easily understood by GitHub Copilot:

- **Predictable naming**: `primary`, `secondary`, `danger` for buttons
- **Semantic categories**: `success`, `warning`, `error`, `info` for status
- **Consistent patterns**: All color functions follow the same API
- **Clear documentation**: Each color token has a specific purpose

### Copilot-Friendly Patterns

```tsx
// Button variants - Copilot will suggest these patterns
<Button variant="primary">Save Changes</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>

// Status indicators - Copilot understands these semantics
<StatusBadge status="success">Completed</StatusBadge>
<StatusBadge status="warning">Pending</StatusBadge>
<StatusBadge status="error">Failed</StatusBadge>

// Surface colors - Copilot recognizes these surface types
<Card className="bg-surface-default border-border-default">
<div className="bg-surface-subtle p-4">
<section className="bg-surface-elevated shadow-md">
```

## File Structure
```
src/
├── lib/
│   └── design-system/
│       ├── colors.ts          # Oklab color definitions
│       ├── theme.ts           # Complete theme configuration
│       └── variables.css      # Generated CSS variables
├── hooks/
│   └── use-theme-color.ts     # React hook for colors
└── components/
    └── ui/                    # UI components using the system
```

## Migration Guide

### From Legacy Colors
```tsx
// Before
<div className="bg-blue-500 text-white">

// After
<div className="bg-primary-500 text-neutral-0">
// or
<div className="bg-primary-500 text-white">
```

### Using Semantic Tokens
```tsx
// Instead of hardcoded colors
<div className="bg-gray-100 border-gray-200">

// Use semantic tokens
const { getSemanticColor } = useThemeColor();
<div style={{
  backgroundColor: getSemanticColor('surface', 'subtle'),
  borderColor: getSemanticColor('border', 'default')
}}>
```

## Benefits
1. **Perceptually uniform colors** - Consistent visual weight
2. **Accessible contrast ratios** - WCAG compliant by design
3. **Consistent theming** - Semantic tokens ensure coherence
4. **Developer experience** - Copilot understands the system
5. **Maintainable** - Centralized color management
6. **Future-proof** - Easy to extend and modify

### Palette Étendue (12 Couleurs d'Accent)

#### Couleurs Principales
- **Emerald**: `hsl(158, 72%, 52%)` - Vert émeraude vibrant
- **Indigo**: `hsl(238, 65%, 62%)` - Indigo profond
- **Violet**: `hsl(275, 65%, 68%)` - Violet riche
- **Amber**: `hsl(35, 98%, 62%)` - Ambre chaleureux
- **Rose**: `hsl(348, 78%, 67%)` - Rose moderne
- **Teal**: `hsl(178, 58%, 52%)` - Sarcelle équilibrée

#### Couleurs d'Accent Supplémentaires
- **Coral**: `hsl(12, 88%, 65%)` - Corail vibrant
- **Mint**: `hsl(165, 55%, 58%)` - Menthe fraîche
- **Lavender**: `hsl(260, 45%, 72%)` - Lavande douce
- **Peach**: `hsl(25, 85%, 68%)` - Pêche chaleureuse
- **Sage**: `hsl(135, 35%, 65%)` - Sauge naturelle
- **Sky**: `hsl(195, 88%, 68%)` - Ciel lumineux

### Mode Sombre Harmonieux
Toutes les couleurs s'adaptent automatiquement avec :
- **Saturation augmentée** (+10-15%) pour compenser la perception nocturne
- **Luminosité ajustée** pour le confort visuel
- **Conservation de l'harmonie** colorimétrique Oklab/CAM16

## Composants

### Cards
- Ombres douces avec `shadow-card` et `shadow-card-hover`
- Coins arrondis avec `rounded-lg` (12px)
- Transitions fluides de 200ms
- Animation `animate-fade-in` au chargement

### Buttons
- Nouvelles tailles : `icon-sm`, `icon-lg`
- Effet `active:scale-95` pour le feedback tactile
- Ombres harmonieuses
- Variantes colorées pour différents contextes

### Inputs
- Bordures interactives qui s'animent au focus
- Transitions fluides
- Ombres douces au focus

### StatusBadge
- Component dédié pour les statuts
- Couleurs sémantiques cohérentes
- Icons contextuelles
- Tailles variables (sm, md, lg)

### Avatar
- Support d'images avec Next.js Image
- Fallback avec initiales
- Gradients doux
- Groupes d'avatars avec compteur

## Animations

### Keyframes personnalisées
- `fade-in`: Apparition douce avec légère translation
- `scale-in`: Apparition avec effet de zoom subtil
- `pulse-soft`: Pulsation douce pour les notifications
- `slide-in-from-right`: Glissement depuis la droite

### Timing
- **Micro-interactions**: 200ms cubic-bezier(0.4, 0, 0.2, 1)
- **Transitions de page**: 300-400ms
- **Animations d'attention**: 2s pour les effets continus

## Espacement

### Grille
- Gap par défaut : `gap-6` (24px) au lieu de `gap-4`
- Padding harmonieux avec plus d'air

### Bordures
- Radius par défaut : `0.75rem` (12px)
- Variantes : `rounded-xl` (16px) pour les éléments importants

## Typographie

### Hiérarchie
- Utilisation de la famille Geist pour une lisibilité optimale
- Line-height ajusté à 1.6 pour la lecture
- Font-feature-settings pour les ligatures

### Couleurs de texte
- `text-foreground` : Texte principal
- `text-muted-foreground` : Texte secondaire
- Couleurs sémantiques pour les états

## Utilisation

### Classes CSS personnalisées
```css
.card-shadow: Ombre douce pour les cards
.card-shadow-hover: Ombre renforcée au survol
.soft, .soft-lg: Ombres très douces
```

### Composants recommandés
- Utiliser `StatusBadge` pour tous les statuts
- Utiliser `Avatar` pour les représentations utilisateur  
- Privilégier les Cards avec hover states
- Ajouter des animations de loading avec les skeletons améliorés

## Responsivité

### Breakpoints
- Mobile-first approach maintenu
- Transitions fluides entre les tailles d'écran
- Composants adaptatifs automatiques

### Layout
- Sidebar responsive avec backdrop-blur
- Grilles flexibles avec gap approprié
- Espacement cohérent sur tous les écrans

## Accessibilité

### Focus
- Anneaux de focus visibles avec `focus-visible:ring-2`
- Couleurs contrastées respectant WCAG 2.1
- Support clavier complet

### Couleurs
- Contraste optimisé mais réduit pour le confort
- Support du mode sombre automatique
- Couleurs sémantiques cohérentes

## Performance

### Optimisations
- Transitions CSS plutôt que JavaScript
- Images optimisées avec Next.js Image
- Lazy loading des composants lourds
- Animations GPU-accelerated

### Bundle
- Tree-shaking optimal avec les composants modulaires
- CSS-in-JS minimal
- Utilisation maximale de Tailwind CSS
