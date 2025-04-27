import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import { Skeleton } from '@/components';
import { useErrorNotification } from '@/hooks';

import { useGetUsers } from '../../apis';

import { UserHeader } from './UserHeader';
import { UserList } from './UserList';

export const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePage = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const { data: users, isPending, isError } = useGetUsers();

  useErrorNotification({
    name: 'users',
    description: 'Error retrieving users',
    isError,
  });
  return (
    <section>
      <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }}>
        <UserHeader />
        <Skeleton isError={isError} isLoading={isPending}>
          <UserList users={users?.data || []} currentPage={currentPage} handlePage={handlePage} />
        </Skeleton>
      </Box>
    </section>
  );
};
