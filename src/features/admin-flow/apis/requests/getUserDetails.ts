import { ExtractFnReturnType, queryClient, QueryConfig, useQuery } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError, retryQuery } from '@/utils';

import { UserDTO } from '../../types';
import { queryKey, url } from '../url-query';

export const getUserDetails = async (userId: number) => {
  try {
    const response = await axios.get<ApiResponse<UserDTO>>(`${url.getUsers}/${userId}`);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type QueryFnType = () => Promise<ApiResponse<UserDTO>>;

type UseGetUserDetailsOptions = QueryConfig<QueryFnType>;

export const useGetUserDetails = (userId: number, config?: UseGetUserDetailsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKey.getUserDetails(), userId],
    queryFn: () => getUserDetails(userId),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
  });
};

export const prefetchUserDetails = (userId: number) => {
  return queryClient.prefetchQuery({
    queryKey: [queryKey.getUserDetails(), userId],
    queryFn: () => getUserDetails(userId),
    staleTime: 60 * 1000,
  });
};
