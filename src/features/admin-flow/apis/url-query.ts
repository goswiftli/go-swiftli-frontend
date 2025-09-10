import { env } from '@/config';

export const url = {
  getUsers: env.API_BASE_URL + '/users/list',
  getUserDetails: env.API_BASE_URL + '/admin/user',
  fx: env.API_BASE_URL + '/fx',
};

export const queryKey = {
  all: ['users'],
  getUsers: () => [...queryKey.all, 'get-users'],
  getUserDetails: () => [...queryKey.all, 'get-user-details'],
  getFx: () => ['fx', 'get-fx'],
};
