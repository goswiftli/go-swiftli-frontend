import { ConvertFund, FxDTO } from '@/features/admin-flow/types';
import { useToast } from '@/hooks';
import { MutationConfig, queryClient, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError } from '@/utils';

import { queryKey, url } from '../url-query';

export const convertFund = async (data: ConvertFund) => {
  try {
    const response = await axios.post<ApiResponse<FxDTO>>(url.convertFund, data);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseConvertFund = {
  config?: MutationConfig<typeof convertFund>;
};

export const useConvertFund = ({ config }: UseConvertFund = {}) => {
  const toast = useToast();
  return useMutation({
    mutationFn: convertFund,

    onSuccess: (res) => {
      toast({
        id: 'convert-fund-toast-suc',
        status: 'success',
        description: res.message,
      });
      queryClient.invalidateQueries({ queryKey: queryKey.getAccountBalance(), exact: false });
    },
    onError: (err: any) => {
      toast({
        id: 'convert-fund-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    ...config,
  });
};
