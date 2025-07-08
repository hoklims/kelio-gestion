# Copilot Instructions for Kelio Gestion

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a client and mission management application built with Next.js 14, TypeScript, Tailwind CSS, and Supabase. The application includes:

- Client management (create, edit, archive)
- Mission tracking with deadlines, amounts, and status
- Commission system for team members
- Financial dashboard with charts
- Monthly objectives tracking
- Notes system for clients and missions
- Responsive design optimized for both mobile and desktop

## Tech Stack
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **UI Components**: Radix UI primitives with custom styling
- **Charts**: Recharts for financial visualizations
- **Icons**: Lucide React

## Code Standards
- Use TypeScript with strict type checking
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling with semantic class names
- Implement proper error handling and loading states
- Use Supabase Row Level Security (RLS) for data protection
- Write reusable components with proper prop types
- Follow responsive design principles (mobile-first)

## Database Schema
The application uses the following main tables:
- `profiles` - User profiles with roles
- `clients` - Client information and notes
- `missions` - Mission details with status and financial data
- `commission_settings` - Commission percentages per user
- `objectives` - Monthly targets and goals
- `notes` - Client and mission notes

## Naming Conventions
- Use kebab-case for file and folder names
- Use PascalCase for React components
- Use camelCase for variables and functions
- Use SCREAMING_SNAKE_CASE for constants
- Prefix database functions with the table name

## GitHub Copilot Instructions Update

Add these instructions to your `.github/copilot-instructions.md` file:

```markdown
## Design System Integration

### Modern UI/UX Direction Artistique
**Style**: Dashboard ultra-moderne avec micro-interactions sophistiquées
**Principe**: Contraste élevé, gradients subtils, animations fluides

### Color Usage
- Use `useThemeColor()` hook for dynamic colors
- Prefer semantic tokens: `getSemanticColor('surface', 'default')`
- Use Tailwind classes: `bg-primary-500`, `text-neutral-900`
- Status colors: `getStatusColor('success')` for status indicators

### Modern Card Design Principles
- **High Contrast**: Cards with `lightness: 28%` vs background `lightness: 11%`
- **Thick Borders**: Use `border-2` with colored borders for visibility
- **Gradient Backgrounds**: Subtle color-coded gradients per section
- **Glassmorphism Effects**: `bg-background/50 backdrop-blur-sm` for overlays
- **Box Shadows**: Double shadows for depth: `0 4px 12px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.1)`

### Animation & Interaction Patterns
- **Entrance Animations**: `animate-fade-in-up` with staggered delays (200ms, 400ms)
- **Hover Effects**: `hover:scale-[1.02]` with `transition-all duration-300`
- **Micro-interactions**: Icons that scale on hover, subtle color transitions
- **Loading States**: Elegant spinners with branded colors
- **Button Interactions**: Glow effects with `group-hover:shadow-2xl`

### Component Architecture
```tsx
// KPI Cards with integrated mini-charts
<Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
  
// Quick Action Cards with color-coded gradients
<Card className="group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl cursor-pointer relative overflow-hidden">

// Status Badges with icons and contextual colors
<Badge className="text-xs border bg-blue-500/20 text-blue-400 border-blue-500/30">
```

### Layout Patterns
- **Responsive Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` for KPIs
- **Asymmetric Layouts**: Mix 1/3 and 2/3 column layouts for visual interest
- **Generous Spacing**: Use `space-y-8` and `gap-6` for breathing room
- **Progressive Disclosure**: Hide secondary actions until hover

### Color Palette Strategy
- **Blue** (`from-blue-500 to-indigo-600`): Clients, primary actions
- **Purple** (`from-purple-500 to-violet-600`): Missions, workflows
- **Green** (`from-green-500 to-emerald-600`): Financial success, revenue
- **Orange** (`from-orange-500 to-red-600`): Warnings, objectives, alerts

### Typography & Hierarchy
- **Headers**: `text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent`
- **Subheaders**: `text-2xl font-bold flex items-center gap-2` with contextual icons
- **Metrics**: `text-2xl font-bold text-foreground` for primary values
- **Descriptions**: `text-sm text-muted-foreground` with clear hierarchy

### Button Patterns
- **Primary Actions**: Gradient backgrounds with glow effects
- **Secondary Actions**: Outline style with hover fill transitions
- **Icon Buttons**: Glassmorphism style with backdrop blur
- **Quick Actions**: Color-coded with badges for notifications

### Data Visualization Integration
- **Inline Trends**: Mini sparkline charts in KPI cards
- **Progress Bars**: Animated with gradient fills
- **Status Indicators**: Icon + color + text combinations
- **Interactive Elements**: Hover states reveal additional actions

### Mobile-First Responsive Design
- **Touch Targets**: Minimum 44px for mobile interactions
- **Stacking**: Cards stack vertically on mobile with full width
- **Navigation**: Collapsible sidebar with gesture support
- **Typography**: Scaled appropriately for small screens

### Example Usage Patterns
```tsx
// Modern KPI Card
<Card className="relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
  <CardHeader className="pb-2">
    <div className="flex items-center justify-between">
      <CardTitle className="text-2xl font-bold">{value}</CardTitle>
      <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm text-blue-400">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </CardHeader>
</Card>

// Success states with animation
<Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
  <CheckCircle className="h-3 w-3 mr-1" />
  Terminée
</Badge>

// Interactive Quick Actions
<Link href="/path" className="group">
  <Card className="hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl">
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
  </Card>
</Link>
```
```
