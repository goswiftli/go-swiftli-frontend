export function formatCurrency(amount: number, currencyCode: string, locale = 'en-US') {
  // Format the currency using Intl.NumberFormat
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  // Handle USD specifically to replace the dollar sign
  if (currencyCode === 'USD') {
    // Replace standard $ with S-less dollar sign and add space
    return formatted.replace('$', '$');
  }

  // For other currencies, just add a space after the symbol if not already present
  const currencySymbol = {
    NGN: '₦',
    EUR: '€',
    GBP: '£',
    // Add other currencies as needed
  }[currencyCode];

  if (currencySymbol && formatted.startsWith(currencySymbol)) {
    return formatted.replace(currencySymbol, `${currencySymbol} `);
  }

  return formatted;
}
