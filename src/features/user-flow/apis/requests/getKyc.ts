import { ExtractFnReturnType, queryClient, QueryConfig, useQuery } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError, retryQuery } from '@/utils';

import { KycInfo } from '../../types';
import { queryKey, url } from '../url-query';

export const getKyc = async (email: string) => {
  try {
    const response = await axios.get<ApiResponse<KycInfo>>(`${url.getKyc}/${email}`);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type QueryFnType = () => Promise<ApiResponse<KycInfo>>;

type UseGetKycOptions = QueryConfig<QueryFnType>;

export const useGetKyc = (email: string, config?: UseGetKycOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKey.getKyc(), email],
    queryFn: () => getKyc(email),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
  });
};

export const prefetchKycDetails = (email: string) => {
  return queryClient.prefetchQuery({
    queryKey: [queryKey.getKyc(), email],
    queryFn: () => getKyc(email),
    staleTime: 60 * 1000,
  });
};
