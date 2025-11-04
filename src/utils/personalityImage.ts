const toBaseCode = (code: string): string => {
  if (!code) return '';
  return code.toUpperCase().split('-')[0];
};

const toModernCode = (baseCode: string): string => {
  if (!baseCode) return '';
  if (baseCode.length >= 4) {
    return baseCode.slice(1, 4);
  }
  if (baseCode.length === 3) {
    return baseCode;
  }
  return '';
};

export const buildPersonalityImageSources = (
  codes: Array<string | undefined | null>
): string[] => {
  const sources = new Set<string>();

  codes.forEach((rawCode) => {
    if (!rawCode) return;

    const baseCode = toBaseCode(rawCode);
    if (!baseCode) return;

    const modernCode = toModernCode(baseCode);
    if (modernCode.length === 3) {
      sources.add(`/images/personality-types/${modernCode}.png`);
    }
  });

  return Array.from(sources);
};

export const getModernPersonalityCode = (code: string): string => {
  const baseCode = toBaseCode(code);
  return toModernCode(baseCode);
};

export const getLegacyPersonalityCode = (code: string): string => {
  const baseCode = toBaseCode(code);
  const modernCode = toModernCode(baseCode);
  return modernCode ? `E${modernCode}` : '';
};
