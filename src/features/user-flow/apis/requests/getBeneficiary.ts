import { PaginationState } from '@tanstack/react-table';

import { ExtractFnReturnType, queryClient, QueryConfig, useQuery } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError, retryQuery } from '@/utils';

import { BeneficiaryListDTO } from '../../types';
import { queryKey, url } from '../url-query';

export const getBeneficiary = async (pagination: PaginationState, isAdmin?: boolean) => {
  let adminUrl = url.adminBeneficiary;
  try {
    const response = await axios.get<ApiResponse<BeneficiaryListDTO>>(
      `${isAdmin ? adminUrl : url.beneficiary}?page=${pagination.pageIndex}&size=${pagination.pageSize}`
    );
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type QueryFnType = () => Promise<ApiResponse<BeneficiaryListDTO>>;

type UseGetBeneficiaryOptions = QueryConfig<QueryFnType>;

export const useGetBeneficiary = (
  pagination: PaginationState,
  isAdmin?: boolean,
  config: UseGetBeneficiaryOptions = {}
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKey.getBeneficiary(), pagination, isAdmin],
    queryFn: () => getBeneficiary(pagination, isAdmin),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
  });
};

export const prefetchBeneficiary = (pagination: PaginationState, isAdmin?: boolean) => {
  return queryClient.prefetchQuery({
    queryKey: [queryKey.getBeneficiary(), pagination, isAdmin],
    queryFn: () => getBeneficiary(pagination, isAdmin),
    staleTime: 60 * 1000,
  });
};
