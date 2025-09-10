import { useToast } from '@/hooks';
import { MutationConfig, queryClient, useMutation } from '@/lib';
import { axios } from '@/lib/axios';
import { useAppDispatch } from '@/redux';
import { ApiResponse } from '@/types';
import { clearDataFromSessStorage, formatError } from '@/utils';

import { CreateBeneficiaryDTO } from '../../types';
import { setBeneficiaryInformation } from '../../userFlowSlice';
import { queryKey, url } from '../url-query';

export const createBeneficiary = async (data: CreateBeneficiaryDTO) => {
  try {
    const response = await axios.post<ApiResponse<CreateBeneficiaryDTO>>(
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
  const dispatch = useAppDispatch();
  return useMutation({
    onError: (err: any) => {
      toast({
        id: 'beneficiary-toast-error',
        status: 'error',
        description: err.message,
      });
    },
    onSuccess: () => {
      clearDataFromSessStorage('beneficiary-info');
      dispatch(setBeneficiaryInformation({}));
      queryClient.invalidateQueries({ queryKey: [queryKey.getBeneficiary()], exact: false });
    },
    mutationFn: createBeneficiary,
    ...config,
  });
};
