export const customExports = [
  {
    name: 'Image',
    icon: '/themes/11.png',
    comingSoon: true,
  },
  {
    name: 'Video',
    icon: '/themes/11.png',
    comingSoon: true,
  },
];

export const themes = [
  {
    name: 'Ivory',
    palette: ['#F8F2E8', '#FFF8EF', '#211A14', '#A7835B'],
  },
  {
    name: 'Noir',
    palette: ['#14110F', '#201A17', '#F7EDE1', '#BE9B75'],
  },
  {
    name: 'Champagne',
    palette: ['#F6EFE6', '#FFF7EF', '#2C231D', '#C59B6A'],
  },
  {
    name: 'Sage',
    palette: ['#EDF2EC', '#F8FBF7', '#233025', '#718873'],
  },
  {
    name: 'Bordeaux',
    palette: ['#23171B', '#302126', '#F8E9E8', '#A26D77'],
  },
  {
    name: 'Cobalt',
    palette: ['#E9EFF6', '#F8FBFF', '#182536', '#5E7B9C'],
  },
  {
    name: 'Mocha',
    palette: ['#241B17', '#302520', '#F7E8D7', '#B98B63'],
  },
  {
    name: 'Pearl',
    palette: ['#F5F1ED', '#FCFAF7', '#352E2A', '#958072'],
  },
];

export const buttonVariants = [
  {
    id: 'soft-solid',
    name: 'Obsidian',
    description: 'Rich fill with subtle lift.',
  },
  {
    id: 'glass-outline',
    name: 'Frost',
    description: 'Translucent outline with glow.',
  },
  {
    id: 'floating-pill',
    name: 'Halo',
    description: 'Floating pill with warm depth.',
  },
];

const themeLookup = themes.reduce((accumulator, theme) => {
  accumulator[theme.name] = theme;
  return accumulator;
}, {});

const fallbackTheme = themes[0];

export const hexToRgba = (hexColor, alpha = 1) => {
  if (!hexColor) {
    return `rgba(255, 255, 255, ${alpha})`;
  }

  let normalized = String(hexColor).replace('#', '');

  if (normalized.length === 3) {
    normalized = normalized
      .split('')
      .map((character) => character + character)
      .join('');
  }

  const value = Number.parseInt(normalized, 16);

  if (Number.isNaN(value)) {
    return `rgba(255, 255, 255, ${alpha})`;
  }

  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

export const normalizeThemePalette = (themePalette) => {
  if (!themePalette) {
    return fallbackTheme;
  }

  let resolvedTheme = themePalette;

  if (typeof themePalette === 'string') {
    try {
      resolvedTheme = JSON.parse(themePalette);
    } catch (error) {
      resolvedTheme = themeLookup[themePalette] || fallbackTheme;
    }
  }

  const matchedTheme = themeLookup[resolvedTheme?.name] || fallbackTheme;
  const palette = Array.isArray(resolvedTheme?.palette)
    ? resolvedTheme.palette
    : matchedTheme.palette;

  return {
    name: resolvedTheme?.name || matchedTheme.name,
    palette: [
      palette[0] || matchedTheme.palette[0],
      palette[1] || matchedTheme.palette[1],
      palette[2] || matchedTheme.palette[2],
      palette[3] || matchedTheme.palette[3],
    ],
  };
};

export const resolveThemeTokens = (themePalette) => {
  const normalized = normalizeThemePalette(themePalette);
  const [background, surface, text, accent] = normalized.palette;

  return {
    ...normalized,
    background,
    surface,
    text,
    accent,
    textMuted: hexToRgba(text, 0.68),
    textSoft: hexToRgba(text, 0.52),
    border: hexToRgba(text, 0.1),
    borderStrong: hexToRgba(text, 0.16),
    shadow: hexToRgba(text, 0.18),
    accentSoft: hexToRgba(accent, 0.14),
    accentRing: hexToRgba(accent, 0.24),
    panelFill: hexToRgba(surface, 0.42),
    panelStrong: hexToRgba(surface, 0.72),
    badgeFill: hexToRgba(text, 0.06),
    badgeBorder: hexToRgba(text, 0.12),
    heroBackground: `
      radial-gradient(circle at top, ${hexToRgba(accent, 0.25)} 0%, transparent 34%),
      radial-gradient(circle at bottom left, ${hexToRgba(text, 0.12)} 0%, transparent 22%),
      linear-gradient(180deg, ${background} 0%, ${hexToRgba(surface, 0.96)} 100%)
    `,
  };
};

export const normalizeButtonStyle = (buttonStyle) => {
  if (!buttonStyle) {
    return 'soft-solid';
  }

  const normalizedStyle = String(buttonStyle);

  if (buttonVariants.some((variant) => variant.id === normalizedStyle)) {
    return normalizedStyle;
  }

  if (normalizedStyle.includes('bg-transparent')) {
    return 'glass-outline';
  }

  if (normalizedStyle.includes('shadow')) {
    return 'floating-pill';
  }

  return 'soft-solid';
};

export const getButtonVariantStyles = (buttonStyle, themePalette) => {
  const variant = normalizeButtonStyle(buttonStyle);
  const theme = resolveThemeTokens(themePalette);

  const shared = {
    border: `1px solid ${theme.borderStrong}`,
    color: theme.text,
    boxShadow: `0 18px 50px ${theme.shadow}`,
  };

  if (variant === 'glass-outline') {
    return {
      variant,
      style: {
        ...shared,
        background: hexToRgba(theme.surface, 0.2),
        backdropFilter: 'blur(22px)',
      },
    };
  }

  if (variant === 'floating-pill') {
    return {
      variant,
      style: {
        ...shared,
        background: `linear-gradient(135deg, ${hexToRgba(
          theme.surface,
          0.96
        )} 0%, ${hexToRgba(theme.accent, 0.14)} 100%)`,
        border: `1px solid ${hexToRgba(theme.accent, 0.18)}`,
        boxShadow: `0 28px 80px ${theme.shadow}`,
      },
    };
  }

  return {
    variant,
    style: {
      ...shared,
      background: `linear-gradient(135deg, ${theme.text} 0%, ${hexToRgba(
        theme.text,
        0.86
      )} 100%)`,
      color: theme.background || '#fff',
      border: `1px solid ${hexToRgba(theme.text, 0.08)}`,
      boxShadow: `0 24px 80px ${hexToRgba(theme.text, 0.28)}`,
    },
  };
};

export const getThemePreviewStyle = (themePalette) => {
  const theme = normalizeThemePalette(themePalette);
  const [background, surface, text, accent] = theme.palette;

  return {
    background: `linear-gradient(145deg, ${background} 0%, ${surface} 100%)`,
    border: `1px solid ${hexToRgba(text, 0.1)}`,
    boxShadow: `0 20px 60px ${hexToRgba(text, 0.14)}`,
    '--preview-accent': accent,
    '--preview-text': text,
  };
};
