import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router';

import { ReactComponent as LockIcon } from '@/assets/icons/lock.svg';
import { Table, TableColumn } from '@/components';
import { CONSTANTS, LINKS } from '@/constants';
import { KycStatus } from '@/features/user-flow';
import { checkStatusType, createEncryptedUrlParams } from '@/utils';

import { prefetchUserDetails } from '../../apis';
import { UserDTO } from '../../types';

type UserListProps = {
  users: UserDTO[];
  currentPage: number;
  handlePage: ({ selected }: { selected: number }) => void;
  totalPages: number;
};

export const UserList = ({ currentPage, handlePage, users, totalPages }: UserListProps) => {
  const navigate = useNavigate();
  const handleViewUser = (username: string) => {
    const queryParams = {
      username: username,
    };
    const encryptedParams = createEncryptedUrlParams(queryParams);
    navigate(LINKS.USER_DETAILS + encryptedParams);
  };

  const handleDeleteUser = (userId: number) => {
    console.log(userId);
  };
  const tableColumns: TableColumn<UserDTO>[] = [
    {
      title: 'Name',
      Cell: ({ entry }) => (
        <Text as="span">{`${entry.kyc?.firstName ?? 'N/A'} ${entry.kyc?.lastName ?? 'N/A'}`}</Text>
      ),
    },
    {
      title: 'Email',
      field: 'username',
    },
    {
      title: 'Phone Number',
      field: 'phoneNumber',
    },
    {
      title: 'KYC STATUS',
      Cell: ({ entry }) =>
        checkStatusType(entry.kyc?.kycStatus || (CONSTANTS.PENDING as KycStatus)),
    },

    {
      title: 'ACTIONS',
      Cell: ({ entry }) => (
        <HStack>
          <Box
            onMouseEnter={() => prefetchUserDetails(entry.id)}
            onClick={() => handleViewUser(entry.username)}
            _hover={{ cursor: 'pointer' }}
          >
            <Icon color="black.700" as={FaEye} boxSize={8} />
          </Box>
          <Box onClick={() => handleDeleteUser(entry.id)} _hover={{ cursor: 'pointer' }}>
            <Icon as={LockIcon} boxSize={8} />
          </Box>
        </HStack>
      ),
    },
  ];
  return (
    <Table
      columns={tableColumns}
      currentPage={currentPage}
      data={users}
      totalPages={totalPages}
      uniqueKey="email"
      handlePage={handlePage}
      emptyData={{ title: 'No Users found', body: 'All users created will be added here' }}
    />
  );
};
