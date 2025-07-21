import { ExtractFnReturnType, queryClient, QueryConfig, useQuery } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError, retryQuery } from '@/utils';

import { BeneficiaryListDTO } from '../../types';
import { queryKey, url } from '../url-query';

const PAGE_SIZE = 10;
export const getBeneficiary = async (currentPage: number) => {
  try {
    const response = await axios.get<ApiResponse<BeneficiaryListDTO>>(
      `${url.beneficiary}?page=${currentPage}&size=${PAGE_SIZE}`
    );
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type QueryFnType = () => Promise<ApiResponse<BeneficiaryListDTO>>;

type UseGetBeneficiaryOptions = QueryConfig<QueryFnType>;

export const useGetBeneficiary = (currentPage: number, config: UseGetBeneficiaryOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKey.getBeneficiary(), currentPage],
    queryFn: () => getBeneficiary(currentPage),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
  });
};

export const prefetchBeneficiary = (currentPage: number) => {
  return queryClient.prefetchQuery({
    queryKey: [queryKey.getBeneficiary(), currentPage],
    queryFn: () => getBeneficiary(currentPage),
    staleTime: 60 * 1000,
  });
};
