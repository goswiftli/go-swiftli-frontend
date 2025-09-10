import { PaginationState } from '@tanstack/react-table';

import { ExtractFnReturnType, queryClient, QueryConfig, useQuery } from '@/lib';
import { axios } from '@/lib/axios';
import { PaginatedResponse } from '@/types';
import { formatError, retryQuery } from '@/utils';

import { TransactionsDTO } from '../../types';
import { queryKey, url } from '../url-query';

export const getTransactions = async (pagination: PaginationState, isAdmin?: boolean) => {
  let adminUrl = url.getAdminTransactions;
  try {
    const response = await axios.get<
      PaginatedResponse<{
        transaction: TransactionsDTO[];
        totalPages: number;
        totalElements: number;
      }>
    >(
      `${isAdmin ? adminUrl : url.getTransactions}?page=${pagination.pageIndex}&size=${pagination.pageSize}`
    );
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type QueryFnType = () => Promise<
  PaginatedResponse<{ transaction: TransactionsDTO[]; totalPages: number; totalElements: number }>
>;

type UseGetTransactionsOptions = QueryConfig<QueryFnType>;

export const useGetTransactions = (
  pagination: PaginationState,
  isAdmin?: boolean,
  config: UseGetTransactionsOptions = {}
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKey.getTransactions(), pagination, isAdmin],
    queryFn: () => getTransactions(pagination, isAdmin),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
  });
};

export const prefetchTransactions = (pagination: PaginationState, isAdmin?: boolean) => {
  return queryClient.prefetchQuery({
    queryKey: [queryKey.getTransactions(), pagination, isAdmin],
    queryFn: () => getTransactions(pagination, isAdmin),
    staleTime: 60 * 1000,
  });
};
