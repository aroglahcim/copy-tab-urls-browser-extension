export const DEFAULT_SETTINGS = {
  separatorPreset: 'newline',
  customSeparator: '',
};

const PRESET_VALUES = {
  newline: '\n',
  space: ' ',
  comma: ',',
  semicolon: ';',
};

export function resolveSeparator({ separatorPreset, customSeparator } = {}) {
  if (separatorPreset === 'custom') {
    return customSeparator ?? '';
  }
  return PRESET_VALUES[separatorPreset] ?? PRESET_VALUES.newline;
}
