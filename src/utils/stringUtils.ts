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
  } else if (word.includes('-')) {
    return word
      .split('-')
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

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const getPageSizeRange = (totalItems: number): number[] => {
  let pageSizeOptions: number[];
  if (totalItems >= 10) {
    const arrayItems = Array.from({ length: Math.ceil(totalItems / 10) }, (_, i) => (i + 1) * 10);
    pageSizeOptions = arrayItems;
  } else {
    pageSizeOptions = [totalItems];
  }

  return pageSizeOptions;
};
