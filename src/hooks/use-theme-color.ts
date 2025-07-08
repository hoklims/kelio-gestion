/**
 * React hook for accessing theme colors in Kelio Gestion
 * Provides easy access to Oklab-based color system
 */
import { COLORS, getColorFromToken, COLOR_TOKENS } from '../lib/design-system/colors';

export function useThemeColor() {
  const getColor = (token: string) => {
    return getColorFromToken(token);
  };
  
  const getSemanticColor = (category: keyof typeof COLOR_TOKENS, variant?: string) => {
    const tokenPath = COLOR_TOKENS[category];
    
    if (!tokenPath) return null;
    
    if (typeof tokenPath === 'string') {
      return getColorFromToken(tokenPath);
    }
    
    if (variant && typeof tokenPath === 'object' && variant in tokenPath) {
      const token = (tokenPath as Record<string, string>)[variant];
      return getColorFromToken(token);
    }
    
    return null;
  };
  
  const getButtonColors = (variant: 'primary' | 'secondary' | 'danger') => {
    const buttonTokens = COLOR_TOKENS.button[variant];
    return {
      bg: getColorFromToken(buttonTokens.bg),
      hover: getColorFromToken(buttonTokens.hover),
      active: getColorFromToken(buttonTokens.active),
      text: getColorFromToken(buttonTokens.text),
    };
  };
  
  const getStatusColor = (status: keyof typeof COLOR_TOKENS.status) => {
    const token = COLOR_TOKENS.status[status];
    return getColorFromToken(token);
  };
  
  return {
    colors: COLORS,
    tokens: COLOR_TOKENS,
    getColor,
    getSemanticColor,
    getButtonColors,
    getStatusColor,
  };
}
