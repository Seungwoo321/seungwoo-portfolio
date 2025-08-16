/**
 * Mantine to Tailwind spacing conversion utilities
 * Resolves conflicts between Mantine component props and Tailwind classes
 */

// Mantine spacing scale (in rem)
const mantineSpacing = {
  xs: 0.625,  // 10px
  sm: 0.75,   // 12px
  md: 1,      // 16px
  lg: 1.25,   // 20px
  xl: 1.5,    // 24px
} as const;

// Tailwind spacing scale (in rem)
const tailwindSpacing = {
  0: 0,
  1: 0.25,    // 4px
  2: 0.5,     // 8px
  3: 0.75,    // 12px
  4: 1,       // 16px
  5: 1.25,    // 20px
  6: 1.5,     // 24px
  8: 2,       // 32px
  10: 2.5,    // 40px
  12: 3,      // 48px
  16: 4,      // 64px
} as const;

type MantineSpacing = keyof typeof mantineSpacing;
type TailwindSpacing = keyof typeof tailwindSpacing;

/**
 * Convert Mantine spacing values to equivalent Tailwind classes
 */
export function mantineToTailwind(mantineValue: MantineSpacing, prefix: 'p' | 'm' | 'pt' | 'pb' | 'pl' | 'pr' | 'mt' | 'mb' | 'ml' | 'mr' | 'px' | 'py' | 'mx' | 'my'): string {
  const remValue = mantineSpacing[mantineValue];
  
  // Find closest Tailwind value
  let closestKey: TailwindSpacing = 0;
  let closestDiff = Infinity;
  
  for (const [key, value] of Object.entries(tailwindSpacing)) {
    const diff = Math.abs(value - remValue);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestKey = key as unknown as TailwindSpacing;
    }
  }
  
  return `${prefix}-${closestKey}`;
}

/**
 * Get standardized spacing classes for consistent use
 */
export const spacing = {
  // Padding
  padding: {
    xs: 'p-2.5',    // 10px
    sm: 'p-3',      // 12px
    md: 'p-4',      // 16px
    lg: 'p-5',      // 20px
    xl: 'p-6',      // 24px
  },
  
  // Margin
  margin: {
    xs: 'm-2.5',    // 10px
    sm: 'm-3',      // 12px
    md: 'm-4',      // 16px
    lg: 'm-5',      // 20px
    xl: 'm-6',      // 24px
  },
  
  // Margin bottom
  marginBottom: {
    xs: 'mb-2.5',   // 10px
    sm: 'mb-3',     // 12px
    md: 'mb-4',     // 16px
    lg: 'mb-5',     // 20px
    xl: 'mb-6',     // 24px
  },
  
  // Margin top
  marginTop: {
    xs: 'mt-2.5',   // 10px
    sm: 'mt-3',     // 12px
    md: 'mt-4',     // 16px
    lg: 'mt-5',     // 20px
    xl: 'mt-6',     // 24px
  },
  
  // Gap
  gap: {
    xs: 'gap-2.5',  // 10px
    sm: 'gap-3',    // 12px
    md: 'gap-4',    // 16px
    lg: 'gap-5',    // 20px
    xl: 'gap-6',    // 24px
  },
  
  // Space
  space: {
    xs: 'space-y-2.5',  // 10px
    sm: 'space-y-3',    // 12px
    md: 'space-y-4',    // 16px
    lg: 'space-y-5',    // 20px
    xl: 'space-y-6',    // 24px
  },
} as const;

/**
 * Important: Use either Mantine props OR Tailwind classes, not both
 * 
 * Bad:  <Text mb="md" className="mb-4">
 * Good: <Text className="mb-4">
 * Good: <Text mb="md">
 */