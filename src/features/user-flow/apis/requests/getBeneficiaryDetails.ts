import { ExtractFnReturnType, queryClient, QueryConfig, useQuery } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError, retryQuery } from '@/utils';

import { BeneficiaryDTO } from '../../types';
import { queryKey, url } from '../url-query';

export const getBeneficiaryDetails = async (id: number) => {
  try {
    const response = await axios.get<ApiResponse<BeneficiaryDTO>>(`${url.beneficiary}/${id}`);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type QueryFnType = () => Promise<ApiResponse<BeneficiaryDTO>>;

type UseGetBeneficiaryDetailsOptions = QueryConfig<QueryFnType>;

export const useGetBeneficiaryDetails = (
  id: number,
  config: UseGetBeneficiaryDetailsOptions = {}
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKey.getBeneficiaryDetails(), id],
    queryFn: () => getBeneficiaryDetails(id),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
  });
};

export const prefetchBeneficiaryDetails = (id: number) => {
  return queryClient.prefetchQuery({
    queryKey: [queryKey.getBeneficiaryDetails(), id],
    queryFn: () => getBeneficiaryDetails(id),
    staleTime: 60 * 1000,
  });
};
