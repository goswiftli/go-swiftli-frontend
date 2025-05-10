import { useToast } from '@/hooks';
import { MutationConfig, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError } from '@/utils';

import { BeneficiaryDTO } from '../../types';
import { url } from '../url-query';

export const createBeneficiary = async (data: BeneficiaryDTO) => {
  try {
    const response = await axios.post<ApiResponse<BeneficiaryDTO>>(
      `${url.beneficiary}/create`,
      data
    );
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type UseCreateBeneficiary = {
  config?: MutationConfig<typeof createBeneficiary>;
};

export const useCreateBeneficiary = ({ config }: UseCreateBeneficiary = {}) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'beneficiary-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    onSuccess: (res) => {
      toast({
        id: 'beneficiary-toast-suc',
        status: 'success',
        description: res.message ?? 'Beneficiary created successful!',
      });
    },
    mutationFn: createBeneficiary,
    ...config,
  });
};
