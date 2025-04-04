import { useNavigate } from 'react-router';

import { LINKS } from '@/constants';
import { useToast } from '@/hooks';
import { MutationConfig, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError } from '@/utils';

import { SignupDTO, UserDTO } from '../../types';
import { url } from '../url-query';

export const signup = async (data: SignupDTO) => {
  try {
    const response = await axios.post<ApiResponse<UserDTO>>(url.signup, data);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseSignupOptions = {
  config?: MutationConfig<typeof signup>;
};

export const useSignup = ({ config }: UseSignupOptions = {}) => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'signup-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    onSuccess: (res) => {
      toast({
        id: 'signup-toast-suc',
        status: 'success',
        description: res.message ?? 'Account created successfully!',
      });
      navigate(LINKS.VERIFY_EMAIL);
    },
    mutationFn: signup,
    ...config,
  });
};
