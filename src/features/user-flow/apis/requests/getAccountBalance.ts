import { ExtractFnReturnType, queryClient, QueryConfig, useQuery } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError, retryQuery } from '@/utils';

import { AccountBalance } from '../../types';
import { queryKey, url } from '../url-query';

export const getAccountBalance = async () => {
  try {
    const response = await axios.get<ApiResponse<AccountBalance>>(url.getAccountBalance);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type QueryFnType = () => Promise<ApiResponse<AccountBalance>>;

type UseGetAccountBalanceOptions = QueryConfig<QueryFnType>;

export const useGetAccountBalance = (config: UseGetAccountBalanceOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey.getAccountBalance(),
    queryFn: () => getAccountBalance(),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
  });
};

export const prefetchAccountBalance = () => {
  return queryClient.prefetchQuery({
    queryKey: queryKey.getAccountBalance(),
    queryFn: () => getAccountBalance(),
    staleTime: 60 * 1000,
  });
};
