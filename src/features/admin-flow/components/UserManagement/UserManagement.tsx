import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import { UserHeader } from './UserHeader';
import { UserList } from './UserList';

export const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePage = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  return (
    <section>
      <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }}>
        <UserHeader />
        <UserList currentPage={currentPage} handlePage={handlePage} />
      </Box>
    </section>
  );
};
