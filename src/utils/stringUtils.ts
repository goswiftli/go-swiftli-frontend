export const capitalizeWord = (word: string = '') => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const convertUnderscoreToSpace = (word: string = '') => {
  if (typeof word !== 'string') {
    return '';
  }
  if (word.includes('_')) {
    return word
      .split('_')
      .map((word) => capitalizeWord(word))
      .join(' ');
  }
  return capitalizeWord(word);
};

export const formatNumberWithSuffix = (value: number) => {
  if (value >= 1_000_000) {
    const formatted = value / 1_000_000;
    return `${Number.isInteger(formatted ? formatted.toFixed(0) : formatted.toFixed(1))}M`;
  } else if (value >= 1_000) {
    const formatted = value / 1_000;
    return `${Number.isInteger(formatted ? formatted.toFixed(0) : formatted.toFixed(1))}K`;
  }
  return value.toString();
};
