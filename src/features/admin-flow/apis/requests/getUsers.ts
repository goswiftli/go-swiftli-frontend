import { ExtractFnReturnType, queryClient, QueryConfig, useQuery } from '@/lib';
import { axios } from '@/lib/axios';
import { Paginate } from '@/types';
import { formatError, retryQuery } from '@/utils';

import { UserDTO } from '../../types';
import { queryKey, url } from '../url-query';

type UserFilter = {
  userStatus: string;
  kycStatus: string;
};

export const getUsers = async (searchTerm: string, currentPage: number, userStatus: UserFilter) => {
  try {
    const PAGE_SIZE = 10;
    let searchObject = {};

    if (searchTerm.trim() !== '') {
      searchObject = {
        searchTerm: searchTerm,
      };
    }
    const response = await axios.post<Paginate<UserDTO>>(
      `${url.getUsers}?pageSize=${PAGE_SIZE}&pageNumber=${currentPage}`,
      searchTerm ? searchObject : userStatus
    );
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type QueryFnType = () => Promise<Paginate<UserDTO>>;

type UseGetUserOptions = QueryConfig<QueryFnType>;

export const useGetUsers = (
  searchTerm: string = '',
  currentPage: number = 0,
  userStatus?: UserFilter,
  config: UseGetUserOptions = {}
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKey.getUsers(), searchTerm, { currentPage, userStatus }],
    queryFn: () => getUsers(searchTerm ?? '', currentPage, userStatus || ({} as UserFilter)),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
  });
};

export const prefetchUsers = (
  searchTerm: string = '',
  currentPage: number = 0,
  userStatus?: UserFilter
) => {
  return queryClient.prefetchQuery({
    queryKey: [queryKey.getUsers(), searchTerm, { currentPage, userStatus }],
    queryFn: () => getUsers(searchTerm ?? '', currentPage, userStatus || ({} as UserFilter)),
    staleTime: 60 * 1000,
  });
};
