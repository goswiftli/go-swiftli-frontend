import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import { Skeleton } from '@/components';
import { useErrorNotification } from '@/hooks';
import { useAppSelector } from '@/redux';

import { useGetUsers } from '../../apis';

import { UserHeader } from './UserHeader';
import { UserList } from './UserList';

export const UserManagement = () => {
  const { userFilter } = useAppSelector((state) => state.adminFlow);
  const [currentPage, setCurrentPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');

  const handlePage = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const {
    data: users,
    isPending,
    isError,
    error,
  } = useGetUsers(searchTerm, currentPage, userFilter);
  const totalPages = users?.totalPages ?? 0;

  useErrorNotification({
    name: 'users',
    description: error?.message ?? 'Error retrieving users',
    isError,
  });
  return (
    <section>
      <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }}>
        <UserHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Skeleton isError={isError} isLoading={isPending}>
          <UserList
            users={users?.content || []}
            currentPage={currentPage}
            handlePage={handlePage}
            totalPages={totalPages}
          />
        </Skeleton>
      </Box>
    </section>
  );
};
