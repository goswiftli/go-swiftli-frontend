import { env } from '@/config';

export const url = {
  setupSettings: env.API_BASE_URL + '/settings/create',
  getSettings: env.API_BASE_URL + '/settings',
  profile: env.API_BASE_URL + '/profiles',
};

export const queryKey = {
  all: ['shared'],
  getSettings: () => [...queryKey.all, 'get-settings'],
  getProfile: () => [queryKey.all, 'get-profile'],
};
