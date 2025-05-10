import { ExtractFnReturnType, queryClient, QueryConfig, useQuery } from '@/lib';
import { axios } from '@/lib/axios';
import { ApiResponse } from '@/types';
import { formatError, retryQuery } from '@/utils';

import { SettingsDTO } from '../../types';
import { queryKey, url } from '../url-query';

export const getSettings = async () => {
  try {
    const response = await axios.get<ApiResponse<SettingsDTO>>(url.getSettings);
    return response.data;
  } catch (err) {
    throw Error(formatError(err));
  }
};

type QueryFnType = () => Promise<ApiResponse<SettingsDTO>>;

type UseGetSettingsOptions = QueryConfig<QueryFnType>;

export const useGetSettings = (config: UseGetSettingsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [queryKey.getSettings()],
    queryFn: () => getSettings(),
    retry: (failureCount, error: any) => retryQuery(failureCount, error),
  });
};

export const prefetchSettings = () => {
  return queryClient.prefetchQuery({
    queryKey: [queryKey.getSettings()],
    queryFn: () => getSettings(),
    staleTime: 60 * 1000,
  });
};
