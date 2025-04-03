import { useNavigate } from 'react-router';

import { LINKS } from '@/constants';
import { useToast } from '@/hooks';
import { MutationConfig, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError } from '@/utils';

import { UserDTO } from '../../types';
import { url } from '../url-query';

type VerifyEmailDTO = {
  code: string;
};
export const verifyEmail = async (code: VerifyEmailDTO) => {
  try {
    const response = await axios.put<ApiResponse<UserDTO>>(url.verifyEmail, code);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseVerifyEmailOptions = {
  config?: MutationConfig<typeof verifyEmail>;
};

export const useVerifyEmail = ({ config }: UseVerifyEmailOptions = {}) => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'verify-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    onSuccess: () => {
      toast({
        id: 'verify-toast-suc',
        status: 'success',
        description: 'Account verified successfully!',
      });
      navigate(LINKS.LOGIN);
    },
    mutationFn: verifyEmail,
    ...config,
  });
};
