import { CONSTANTS } from '@/constants';
import { Fx } from '@/features/admin-flow/types';
import { clearDataFromSessStorage, deleteFileFromIdb } from '@/utils';

export const clearKycData = async () => {
  const idKeys = [CONSTANTS.ID_CARD, CONSTANTS.DRIVING_LICENSE, CONSTANTS.PASSPORT];
  clearDataFromSessStorage('kyc-per-info');
  clearDataFromSessStorage('kyc-id-info');
  clearDataFromSessStorage('identification-details');

  try {
    await deleteFileFromIdb('uploaded-photo');

    for (const key of idKeys) {
      await deleteFileFromIdb(key);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}
};

export const returnNairaUsdPair = (fxRates: Fx[] = []) => {
  const fxRate = fxRates.find(
    (rate) => rate.baseCurrency === 'NGN' && rate.targetCurrency === 'USD'
  );
  return fxRate;
};
