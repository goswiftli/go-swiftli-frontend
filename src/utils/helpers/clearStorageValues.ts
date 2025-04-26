import { CONSTANTS } from '@/constants';

import { deleteFileFromIdb } from '../fileUtils';

import { clearDataFromSessStorage } from './handleDataInSessStorage';

const idKeys = [CONSTANTS.ID_CARD, CONSTANTS.DRIVING_LICENSE, CONSTANTS.PASSPORT];

export const clearStorageValues = async () => {
  clearDataFromSessStorage('auth_user');
  clearDataFromSessStorage('token');
  clearDataFromSessStorage('beneficiary-info');
  clearDataFromSessStorage('kyc-id-info');
  clearDataFromSessStorage('kyc-per-info');
  clearDataFromSessStorage('identification-details');

  try {
    await deleteFileFromIdb('uploaded-photo');

    for (const key of idKeys) {
      await deleteFileFromIdb(key);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}
};
