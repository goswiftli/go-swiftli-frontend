import { Text } from '@chakra-ui/react';

import { Skeleton } from '@/components';
import { useGetUserDetails } from '@/features/admin-flow';
import { useAppSelector } from '@/redux';
import { convertUnderscoreToSpace } from '@/utils';

export const useAccountInfo = () => {
  const { authUser } = useAppSelector((state) => state.auth);

  const { isPending, isError, data: user } = useGetUserDetails(authUser.id);

  const accountInfo = [
    {
      name: 'Joined',
      value: 'March, 2024',
    },
    {
      name: 'Account Email',
      value: (
        <Skeleton isLoading={isPending} isError={isError} display="flex" justifyContent="flex-end">
          <Text as="span">{user?.data?.username}</Text>
        </Skeleton>
      ),
    },
    {
      name: 'Personal KYC status',
      value: (
        <Skeleton isLoading={isPending} isError={isError} display="flex" justifyContent="flex-end">
          <Text as="span">{convertUnderscoreToSpace(user?.data.kyc?.kycStatus)}</Text>
        </Skeleton>
      ),
    },
  ];

  return { accountInfo };
};
