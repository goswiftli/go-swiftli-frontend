import { useToast } from '@/hooks';
import { MutationConfig, queryClient, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError } from '@/utils';

import { Fx, FxDTO } from '../../types';
import { queryKey, url } from '../url-query';

export const createFx = async (data: Fx) => {
  try {
    const response = await axios.post<ApiResponse<FxDTO>>(url.fx, data);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseCreateFx = {
  config?: MutationConfig<typeof createFx>;
};

export const useCreateFx = ({ config }: UseCreateFx = {}) => {
  const toast = useToast();
  return useMutation({
    mutationFn: createFx,

    onSuccess: (res) => {
      toast({
        id: 'fx-toast-suc',
        status: 'success',
        description: res.message,
      });
      queryClient.invalidateQueries({ queryKey: queryKey.getFx(), exact: false });
    },
    onError: (err: any) => {
      toast({
        id: 'fx-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    ...config,
  });
};
