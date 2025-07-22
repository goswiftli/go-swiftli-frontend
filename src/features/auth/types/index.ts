export type SignupDTO = {
  email: string;
  phone: string;
  password: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthUser = {
  token: string;
  refreshToken: string;
  expiredIn: string;
  expiresAt: string;
} & UserDTO;

export type UserDTO = {
  user: User;
};

export type User = {
  username: string;
  phoneNumber: string;
  id: number;
  roles: {
    name: string;
    id: number;
  }[];
};

export type ChangePasswordDTO = {
  oldPassword: string;
  newPassword: string;
  email: string;
};
