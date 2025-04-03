import { clearDataFromSessStorage } from './handleDataInSessStorage';

export const clearStorageValues = () => {
  clearDataFromSessStorage('auth_user');
  clearDataFromSessStorage('token');
};
