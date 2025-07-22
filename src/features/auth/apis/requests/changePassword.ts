import { useNavigate } from 'react-router';

import { LINKS } from '@/constants';
import { useToast } from '@/hooks';
import { MutationConfig, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { useAppDispatch } from '@/redux';
import { ApiResponse } from '@/types';
import { formatError } from '@/utils';

import { logout } from '../../authSlice';
import { ChangePasswordDTO } from '../../types';
import { url } from '../url-query';

export const changePassword = async (data: ChangePasswordDTO) => {
  try {
    const response = await axios.put<ApiResponse<{ message: string }>>(url.changePassword, data);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseChangePasswordOptions = {
  config?: MutationConfig<typeof changePassword>;
};

export const useChangePassword = ({ config }: UseChangePasswordOptions = {}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'change-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    onSuccess: (res) => {
      toast({
        id: 'change-toast-suc',
        status: 'success',
        description: res.message,
      });
      dispatch(logout());
      navigate(LINKS.LOGIN);
    },
    mutationFn: changePassword,
    ...config,
  });
};
