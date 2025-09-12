import { Text } from '@chakra-ui/react';

import { Skeleton } from '@/components';
import { useGetUserDetails } from '@/features/admin-flow';
import { useAppSelector } from '@/redux';
import { convertUnderscoreToSpace, formatDate, returnString } from '@/utils';

export const useAccountInfo = () => {
  const { authUser } = useAppSelector((state) => state.auth);

  const { isPending, isError, data: user } = useGetUserDetails(authUser.id);

  const accountInfo = [
    {
      name: 'Joined',
      value: user?.dateTime ? formatDate(user?.dateTime).fullDate : returnString(user?.dateTime),
    },
    {
      name: 'Account Email',
      value: (
        <Skeleton isLoading={isPending} isError={isError} display="flex" justifyContent="flex-end">
          <Text as="span">{returnString(user?.data?.username)}</Text>
        </Skeleton>
      ),
    },
    {
      name: 'Personal KYC status',
      value: (
        <Skeleton isLoading={isPending} isError={isError} display="flex" justifyContent="flex-end">
          <Text as="span">{convertUnderscoreToSpace(returnString(user?.data.kyc?.kycStatus))}</Text>
        </Skeleton>
      ),
    },
  ];

  return { accountInfo };
};
