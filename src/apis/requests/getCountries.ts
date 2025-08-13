import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig, useQuery } from '@/lib/react-query';
import { formatError } from '@/utils/helpers';

import { url } from '../url-query';

type Country = {
  name: {
    common: string;
  };
  cca2: string;
  cca3: string;
  flags: {
    png: string;
    svg: string;
  };
};

export const getCountries = async () => {
  try {
    const response = await axios.get<Country[]>(`${url.getCountries}?fields=name,cca2`);

    return response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (err) {
    throw new Error(formatError(err));
  }
};

type QueryFnType = () => Promise<Country[]>;

type useCountryOptions = QueryConfig<QueryFnType>;

export const useGetCountries = (config?: useCountryOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['countries'],
    queryFn: () => getCountries(),
  });
};
