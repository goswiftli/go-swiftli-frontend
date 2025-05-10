import { ExtractFnReturnType, queryClient, QueryConfig, useQuery } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError, retryQuery } from '@/utils';

import { BeneficiaryDTO } from '../../types';
import { queryKey, url } from '../url-query';

export const getBeneficiary = async () => {
  try {
    const response = await axios.get<ApiResponse<BeneficiaryDTO[]>>(url.beneficiary);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type QueryFnType = () => Promise<ApiResponse<BeneficiaryDTO[]>>;

type UseGetBeneficiaryOptions = QueryConfig<QueryFnType>;

export const useGetBeneficiary = (config: UseGetBeneficiaryOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKey.getBeneficiary()],
    queryFn: () => getBeneficiary(),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
  });
};

export const prefetchBeneficiary = () => {
  return queryClient.prefetchQuery({
    queryKey: [queryKey.getBeneficiary()],
    queryFn: () => getBeneficiary(),
    staleTime: 60 * 1000,
  });
};
