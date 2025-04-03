import { useNavigate } from 'react-router';

import { LINKS } from '@/constants';
import { useToast } from '@/hooks';
import { MutationConfig, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError } from '@/utils';

import { url } from '../url-query';

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post<ApiResponse<{ message: string }>>(
      `${url.forgotPassword}/${email}`
    );
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseForgotPasswordOptions = {
  config?: MutationConfig<typeof forgotPassword>;
};

export const useForgotPassword = ({ config }: UseForgotPasswordOptions = {}) => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'forgot-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    onSuccess: (res) => {
      toast({
        id: 'forgot-toast-suc',
        status: 'success',
        description: res.message ?? 'Password reset successfully!',
      });
      navigate(LINKS.LOGIN);
    },
    mutationFn: forgotPassword,
    ...config,
  });
};
