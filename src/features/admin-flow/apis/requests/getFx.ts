import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/lib/react-query';
import { ApiResponse } from '@/types';
import { formatError } from '@/utils/helpers';

import { FxDTO } from '../../types';
import { queryKey, url } from '../url-query';

export const getFx = async () => {
  try {
    const response = await axios.get<ApiResponse<FxDTO>>(url.fx);

    return response.data;
  } catch (err) {
    throw new Error(formatError(err));
  }
};

type QueryFnType = () => Promise<ApiResponse<FxDTO>>;

type UseFxOptions = QueryConfig<QueryFnType>;

export const useGetFx = (config?: UseFxOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: queryKey.getFx(),
    queryFn: () => getFx(),
  });
};
