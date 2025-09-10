import { useToast } from '@/hooks';
import { MutationConfig, queryClient, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError } from '@/utils';

import { ApproveKyc } from '../../types';
import { queryKey, url } from '../url-query';

export const approveKyc = async (data: ApproveKyc) => {
  try {
    const response = await axios.put<ApiResponse<ApproveKyc>>(`${url.approveKyc}`, data);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseApproveKyc = {
  config?: MutationConfig<typeof approveKyc>;
};

export const useApproveKyc = ({ config }: UseApproveKyc = {}) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'approve-kyc-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    onSuccess: (res) => {
      toast({
        id: 'approve-kyc-toast-suc',
        status: 'success',
        description: res.message,
      });
      queryClient.invalidateQueries({ queryKey: [queryKey.getKyc()], exact: false });
    },
    mutationFn: approveKyc,
    ...config,
  });
};
