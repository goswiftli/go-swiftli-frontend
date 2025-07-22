import { useToast } from '@/hooks';
import { MutationConfig, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError } from '@/utils';

import { SettingsDTO } from '../../types';
import { url } from '../url-query';

export const setupSettings = async (data: SettingsDTO) => {
  try {
    const response = await axios.post<ApiResponse<SettingsDTO>>(url.setupSettings, data);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseSetupSettings = {
  config?: MutationConfig<typeof setupSettings>;
};

export const useSetupSettings = ({ config }: UseSetupSettings = {}) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'settings-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    onSuccess: (res) => {
      toast({
        id: 'settings-toast-suc',
        status: 'success',
        description: res.message ?? 'Settings updated!',
      });
    },
    mutationFn: setupSettings,
    ...config,
  });
};
