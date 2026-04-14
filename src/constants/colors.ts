// src/constants/colors.ts
export const COLORS = {
  // Primary Colors
  primary: '#2F6CA8',
  secondary: '#3D9AF5',

  // Semantic Colors
  success: '#06C45A',
  error: '#F0351C',

  // Neutral Colors
  white: '#FFFFFF',
  black: '#333333',
  grey: '#CACACA',
  darkgrey: '#9B9B9B',
  lightgrey: '#F5F5F5',
  placeholder: '#BABABA',

  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',

  // Text Colors
  text: '#333333',
  textSecondary: '#9B9B9B',
  textTertiary: '#BABABA',
  textInverse: '#FFFFFF',

  // Border Colors
  border: '#CACACA',
  borderLight: '#F5F5F5',

  // Shadows
  shadowLight: 'rgba(51, 51, 51, 0.05)',
  shadowMedium: 'rgba(51, 51, 51, 0.1)',
  shadowDark: 'rgba(51, 51, 51, 0.25)',
} as const;

export type ColorKey = keyof typeof COLORS;
export type ColorValue = typeof COLORS[ColorKey];
