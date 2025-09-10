import { Role } from '@/features/auth/types';

export const permissionGuard = (roles: Role[]) => {
  return roles.some((role) => role.name === 'ROLE_ADMIN');
};
