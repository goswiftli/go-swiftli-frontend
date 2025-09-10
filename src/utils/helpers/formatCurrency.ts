export function formatCurrency(amount: number, currencyCode: string, locale = 'en-US') {
  // Format the currency using Intl.NumberFormat
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  if (currencyCode === 'USD') {
    return formatted.replace('$', '$');
  }

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
