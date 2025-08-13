import { ExtractFnReturnType, queryClient, QueryConfig, useQuery } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError, retryQuery } from '@/utils';

import { ProfileDTO } from '../../types';
import { queryKey, url } from '../url-query';

export const getProfile = async () => {
  try {
    const response = await axios.get<ApiResponse<ProfileDTO>>(url.profile);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type QueryFnType = () => Promise<ApiResponse<ProfileDTO>>;

type UseGetProfileOptions = QueryConfig<QueryFnType>;

export const useGetProfile = (config?: UseGetProfileOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKey.getProfile()],
    queryFn: () => getProfile(),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
  });
};

export const prefetchProfile = () => {
  return queryClient.prefetchQuery({
    queryKey: [queryKey.getProfile()],
    queryFn: () => getProfile(),
    staleTime: 60 * 1000,
  });
};
