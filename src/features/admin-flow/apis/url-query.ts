import { env } from '@/config';

export const url = {
  getUsers: env.API_BASE_URL + '/admin/admin-user',
  getUserDetails: env.API_BASE_URL + '/admin/user',
};

export const queryKey = {
  all: ['users'],
  getUsers: () => [...queryKey.all, 'get-users'],
  getUserDetails: () => [...queryKey.all, 'get-user-details'],
};
