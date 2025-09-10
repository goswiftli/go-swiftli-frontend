import { useToast } from '@/hooks';
import { MutationConfig, queryClient, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError } from '@/utils';

import { BusinessDetailsDTO, PersonalDetailsDTO, ProfileDTO } from '../../types';
import { queryKey, url } from '../url-query';

export const setupProfile = async (data: ProfileDTO) => {
  try {
    const response = await axios.put<ApiResponse<ProfileDTO>>(url.profile, data);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseSetupProfile = {
  config?: MutationConfig<typeof setupProfile>;
};

export const useSetupProfile = ({ config }: UseSetupProfile = {}) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'setup-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    onSuccess: (res) => {
      toast({
        id: 'set-toast-suc',
        status: 'success',
        description: res.message ?? 'Profile updated successful!',
      });
    },
    mutationFn: setupProfile,
    ...config,
  });
};

export const setupProfilePatch = async (data: PersonalDetailsDTO | BusinessDetailsDTO) => {
  try {
    const response = await axios.patch<ApiResponse<PersonalDetailsDTO | BusinessDetailsDTO>>(
      url.profile,
      data
    );
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseSetupProfilePatch = {
  config?: MutationConfig<typeof setupProfilePatch>;
};

export const useSetupProfilePatch = ({ config }: UseSetupProfilePatch = {}) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'setup-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    onSuccess: (res) => {
      toast({
        id: 'set-toast-suc',
        status: 'success',
        description: res.message ?? 'Profile updated successful!',
      });
      queryClient.invalidateQueries({ queryKey: queryKey.getProfile(), exact: false });
    },
    mutationFn: setupProfilePatch,
    ...config,
  });
};
