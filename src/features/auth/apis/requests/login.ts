import { useNavigate } from 'react-router';

import { LINKS } from '@/constants';
import { useToast } from '@/hooks';
import { MutationConfig, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { useAppDispatch } from '@/redux';
import { ApiResponse } from '@/types';
import { formatError, saveDataToSessStorage } from '@/utils';

import { setAuthUser, setToken } from '../../authSlice';
import { LoginCredentials, AuthUser } from '../../types';
import { url } from '../url-query';

export const login = async (data: LoginCredentials) => {
  try {
    const response = await axios.post<ApiResponse<AuthUser>>(url.login, data);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseLoginOptions = {
  config?: MutationConfig<typeof login>;
};

export const useLogin = ({ config }: UseLoginOptions = {}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'login-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    onSuccess: (res) => {
      toast({
        id: 'login-toast-suc',
        status: 'success',
        description: res.message ?? 'Login successful!',
      });
      saveDataToSessStorage('auth_user', res.data.user);
      saveDataToSessStorage('token', res.data.token);
      dispatch(setToken(res.data.token));
      dispatch(setAuthUser(res.data.user));

      if (res.data.user.username === 'admin@gmail.com') {
        navigate(LINKS.USER_MANAGEMENT);
      } else {
        navigate('/user' + '/' + LINKS.DASHBOARD);
      }
    },
    mutationFn: login,
    ...config,
  });
};
