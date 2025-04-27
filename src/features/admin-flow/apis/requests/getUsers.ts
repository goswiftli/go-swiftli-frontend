import { ExtractFnReturnType, queryClient, QueryConfig, useQuery } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError, retryQuery } from '@/utils';

import { UserDTO } from '../../types';
import { queryKey, url } from '../url-query';

export const getUsers = async () => {
  try {
    const response = await axios.get<ApiResponse<UserDTO[]>>(url.getUsers);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type QueryFnType = () => Promise<ApiResponse<UserDTO[]>>;

type UseGetUserOptions = QueryConfig<QueryFnType>;

export const useGetUsers = (config: UseGetUserOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKey.getUsers()],
    queryFn: () => getUsers(),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
  });
};

export const prefetchUsers = () => {
  return queryClient.prefetchQuery({
    queryKey: [queryKey.getUsers()],
    queryFn: () => getUsers(),
    staleTime: 60 * 1000,
  });
};
