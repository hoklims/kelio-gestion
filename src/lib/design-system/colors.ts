/**
 * Kelio Gestion Color System
 * Based on Oklab/CAM16 for perceptually uniform colors
 * 
 * @description Centralized color system with semantic tokens
 * @see https://bottosson.github.io/posts/oklab/
 */

// Base color definitions in Oklab space
export const OKLAB_COLORS = {
  // Brand colors
  brand: {
    primary: { l: 0.6, a: -0.05, b: -0.15 }, // Blue
    secondary: { l: 0.7, a: 0.15, b: 0.08 }, // Orange
    accent: { l: 0.5, a: -0.15, b: -0.05 }, // Teal
  },
  
  // Neutral colors with perceptual uniformity
  neutral: {
    0: { l: 1.0, a: 0, b: 0 },    // White
    50: { l: 0.98, a: 0, b: 0 },
    100: { l: 0.95, a: 0, b: 0 },
    200: { l: 0.90, a: 0, b: 0 },
    300: { l: 0.80, a: 0, b: 0 },
    400: { l: 0.65, a: 0, b: 0 },
    500: { l: 0.50, a: 0, b: 0 },
    600: { l: 0.35, a: 0, b: 0 },
    700: { l: 0.25, a: 0, b: 0 },
    800: { l: 0.15, a: 0, b: 0 },
    900: { l: 0.08, a: 0, b: 0 },
    950: { l: 0.04, a: 0, b: 0 },
    1000: { l: 0, a: 0, b: 0 },   // Black
  },
  
  // Semantic colors
  semantic: {
    success: { l: 0.7, a: -0.20, b: 0.15 },  // Green
    warning: { l: 0.8, a: 0.10, b: 0.20 },   // Yellow
    error: { l: 0.6, a: 0.25, b: 0.10 },     // Red
    info: { l: 0.7, a: -0.10, b: -0.20 },    // Light Blue
  }
} as const;

// Convert Oklab to RGB with proper clamping and gamma correction
function oklabToRgb(l: number, a: number, b: number): [number, number, number] {
  // Ensure values are within valid Oklab range
  l = Math.max(0, Math.min(1, l));
  a = Math.max(-0.4, Math.min(0.4, a));
  b = Math.max(-0.4, Math.min(0.4, b));

  // Convert to LMS space
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  // Apply cube root properly (handle negative values)
  const l3 = l_ >= 0 ? Math.pow(l_, 3) : -Math.pow(-l_, 3);
  const m3 = m_ >= 0 ? Math.pow(m_, 3) : -Math.pow(-m_, 3);
  const s3 = s_ >= 0 ? Math.pow(s_, 3) : -Math.pow(-s_, 3);

  // Convert to linear RGB
  let r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  let b_val = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

  // Apply sRGB gamma correction
  function linearToSrgb(c: number): number {
    if (c <= 0.0031308) {
      return 12.92 * c;
    } else {
      return 1.055 * Math.pow(c, 1/2.4) - 0.055;
    }
  }

  r = linearToSrgb(r);
  g = linearToSrgb(g);
  b_val = linearToSrgb(b_val);

  // Clamp and convert to 0-255
  return [
    Math.round(Math.max(0, Math.min(1, r)) * 255),
    Math.round(Math.max(0, Math.min(1, g)) * 255),
    Math.round(Math.max(0, Math.min(1, b_val)) * 255)
  ];
}

// Generate color palette with variations
export function generateColorPalette() {
  const palette: Record<string, Record<string | number, string>> = {};
  
  // Generate brand color variations
  Object.entries(OKLAB_COLORS.brand).forEach(([name, color]) => {
    palette[name] = {};
    
    // Define the scale more explicitly
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    
    shades.forEach(shade => {
      let adjustedL: number;
      let adjustedA: number;
      let adjustedB: number;
      
      // Use a more predictable scaling approach
      
      if (shade < 500) {
        // Lighter shades: interpolate towards white
        const lightnessFactor = (500 - shade) / 450; // 0 to 1 for 500 to 50
        adjustedL = color.l + (0.95 - color.l) * lightnessFactor;
        adjustedA = color.a * (1 - lightnessFactor * 0.8);
        adjustedB = color.b * (1 - lightnessFactor * 0.8);
      } else if (shade === 500) {
        // Base color
        adjustedL = color.l;
        adjustedA = color.a;
        adjustedB = color.b;
      } else {
        // Darker shades: interpolate towards black
        const darknessFactor = (shade - 500) / 450; // 0 to 1 for 500 to 950
        adjustedL = color.l * (1 - darknessFactor * 0.85);
        adjustedA = color.a * (1 + darknessFactor * 0.2);
        adjustedB = color.b * (1 + darknessFactor * 0.2);
      }
      
      // Ensure values stay within valid ranges
      adjustedL = Math.max(0.01, Math.min(0.99, adjustedL));
      adjustedA = Math.max(-0.3, Math.min(0.3, adjustedA));
      adjustedB = Math.max(-0.3, Math.min(0.3, adjustedB));
      
      const [r, g, b] = oklabToRgb(adjustedL, adjustedA, adjustedB);
      palette[name][shade] = `rgb(${r}, ${g}, ${b})`;
    });
  });
  
  // Convert neutral colors
  palette.neutral = {};
  Object.entries(OKLAB_COLORS.neutral).forEach(([shade, color]) => {
    const [r, g, b] = oklabToRgb(color.l, color.a, color.b);
    palette.neutral[shade] = `rgb(${r}, ${g}, ${b})`;
  });
  
  // Convert semantic colors with variations
  Object.entries(OKLAB_COLORS.semantic).forEach(([name, color]) => {
    palette[name] = {};
    // Light, default, and dark variations
    const variations = {
      light: { l: color.l + 0.15, a: color.a * 0.7, b: color.b * 0.7 },
      DEFAULT: color,
      dark: { l: color.l - 0.15, a: color.a * 1.3, b: color.b * 1.3 },
    };
    
    Object.entries(variations).forEach(([variant, varColor]) => {
      const [r, g, b] = oklabToRgb(varColor.l, varColor.a, varColor.b);
      palette[name][variant] = `rgb(${r}, ${g}, ${b})`;
    });
  });
  
  return palette;
}

// Semantic color tokens for components
export const COLOR_TOKENS = {
  // Surface colors
  surface: {
    default: 'neutral.0',
    subtle: 'neutral.50',
    muted: 'neutral.100',
    elevated: 'neutral.0',
  },
  
  // Background colors
  background: {
    default: 'neutral.50',
    subtle: 'neutral.100',
    canvas: 'neutral.0',
    overlay: 'neutral.900/50',
  },
  
  // Border colors
  border: {
    default: 'neutral.200',
    subtle: 'neutral.100',
    strong: 'neutral.300',
    focus: 'primary.500',
  },
  
  // Text colors
  text: {
    default: 'neutral.900',
    subtle: 'neutral.600',
    muted: 'neutral.500',
    inverted: 'neutral.0',
    brand: 'primary.600',
  },
  
  // Interactive states
  interactive: {
    hover: 'primary.600',
    active: 'primary.700',
    disabled: 'neutral.300',
  },
  
  // Component specific
  button: {
    primary: {
      bg: 'primary.500',
      hover: 'primary.600',
      active: 'primary.700',
      text: 'neutral.0',
    },
    secondary: {
      bg: 'neutral.100',
      hover: 'neutral.200',
      active: 'neutral.300',
      text: 'neutral.900',
    },
    danger: {
      bg: 'error.DEFAULT',
      hover: 'error.dark',
      active: 'error.dark',
      text: 'neutral.0',
    },
  },
  
  // Status indicators
  status: {
    success: 'success.DEFAULT',
    warning: 'warning.DEFAULT',
    error: 'error.DEFAULT',
    info: 'info.DEFAULT',
    neutral: 'neutral.500',
  },
} as const;

// Export generated palette
export const COLORS = generateColorPalette();

// Log colors immediately for debugging
console.log('Generated COLORS:', COLORS);

// Debug function to log color values
export function debugColors() {
  console.log('=== OKLAB Color System Debug ===');
  Object.entries(COLORS).forEach(([category, shades]) => {
    console.log(`\n${category.toUpperCase()}:`);
    if (typeof shades === 'object' && shades !== null) {
      Object.entries(shades).forEach(([shade, color]) => {
        console.log(`  ${shade}: ${color}`);
      });
    }
  });
}

// Test function to validate color generation
export function testColorGeneration() {
  console.log('=== Color Generation Test ===');
  
  // Test primary color shades
  console.log('\nPRIMARY COLOR TEST:');
  const primary = COLORS.primary;
  if (primary) {
    Object.entries(primary).forEach(([shade, color]) => {
      console.log(`primary-${shade}: ${color}`);
    });
  }
  
  // Test a specific Oklab to RGB conversion
  console.log('\nDIRECT CONVERSION TEST:');
  const testColor = OKLAB_COLORS.brand.primary;
  const [r, g, b] = oklabToRgb(testColor.l, testColor.a, testColor.b);
  console.log(`Base primary: L=${testColor.l}, a=${testColor.a}, b=${testColor.b} -> rgb(${r}, ${g}, ${b})`);
  
  return COLORS;
}

// Helper function to get color value from token
export function getColorFromToken(token: string): string {
  const [category, shade] = token.split('.');
  return COLORS[category]?.[shade] || token;
}
