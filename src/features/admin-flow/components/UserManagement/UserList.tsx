import { Box, HStack, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ReactComponent as EyeIcon } from '@/assets/icons/eye-icon.svg';
import { ReactComponent as LockIcon } from '@/assets/icons/lock.svg';
import { Table, TableColumn } from '@/components';
import { CONSTANTS, LINKS } from '@/constants';
import { checkStatusType } from '@/utils';

import { UserDTO } from '../../types';

type UserListProps = {
  currentPage: number;
  handlePage: ({ selected }: { selected: number }) => void;
};

export const UserList = ({ currentPage, handlePage }: UserListProps) => {
  const navigate = useNavigate();
  const handleViewUser = (email: string) => {
    navigate(LINKS.USER_DETAILS + `?${email}`);
  };
  const handleDeleteUser = (email: string) => {
    console.log(email);
  };
  const tableColumns: TableColumn<UserDTO>[] = [
    {
      title: 'NAME',
      field: 'name',
    },
    {
      title: 'EMAIL',
      field: 'email',
    },
    {
      title: 'PHONE NUMBER',
      field: 'phoneNumber',
    },
    {
      title: 'KYC STATUS',
      Cell: ({ entry }) => checkStatusType(entry.kycStatus),
    },
    {
      title: 'ACCOUNT STATUS',
      Cell: ({ entry }) => checkStatusType(entry.accountStatus),
    },
    {
      title: 'ACTIONS',
      Cell: ({ entry }) => (
        <HStack>
          <Box onClick={() => handleViewUser(entry.email)} _hover={{ cursor: 'pointer' }}>
            <Icon as={EyeIcon} boxSize={8} />
          </Box>
          <Box onClick={() => handleDeleteUser(entry.email)} _hover={{ cursor: 'pointer' }}>
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
      totalPages={1}
      uniqueKey="email"
      handlePage={handlePage}
      emptyData={{ title: 'No Users found', body: 'All users created will be added here' }}
    />
  );
};

const users: UserDTO[] = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phoneNumber: '+1-555-123-4567',
    kycStatus: CONSTANTS.APPROVED,
    accountStatus: CONSTANTS.ACTIVE,
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phoneNumber: '+1-555-987-6543',
    kycStatus: CONSTANTS.PENDING,
    accountStatus: CONSTANTS.ACTIVE,
  },
  {
    name: 'Michael Wong',
    email: 'm.wong@example.com',
    phoneNumber: '+1-555-456-7890',
    kycStatus: CONSTANTS.REJECTED,
    accountStatus: CONSTANTS.SUSPENDED,
  },
  {
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    phoneNumber: '+1-555-234-5678',
    kycStatus: CONSTANTS.APPROVED,
    accountStatus: CONSTANTS.ACTIVE,
  },
  {
    name: 'Robert Garcia',
    email: 'r.garcia@example.com',
    phoneNumber: '+1-555-345-6789',
    kycStatus: CONSTANTS.PENDING,
    accountStatus: CONSTANTS.SUSPENDED,
  },
  {
    name: 'Emily Chen',
    email: 'emily.chen@example.com',
    phoneNumber: '+1-555-567-8901',
    kycStatus: CONSTANTS.APPROVED,
    accountStatus: CONSTANTS.ACTIVE,
  },
  {
    name: 'David Kim',
    email: 'd.kim@example.com',
    phoneNumber: '+1-555-678-9012',
    kycStatus: CONSTANTS.REJECTED,
    accountStatus: CONSTANTS.SUSPENDED,
  },
  {
    name: 'Olivia Martinez',
    email: 'o.martinez@example.com',
    phoneNumber: '+1-555-789-0123',
    kycStatus: CONSTANTS.PENDING,
    accountStatus: CONSTANTS.ACTIVE,
  },
  {
    name: 'James Wilson',
    email: 'j.wilson@example.com',
    phoneNumber: '+1-555-890-1234',
    kycStatus: CONSTANTS.APPROVED,
    accountStatus: CONSTANTS.ACTIVE,
  },
  {
    name: 'Sofia Ahmed',
    email: 'sofia.a@example.com',
    phoneNumber: '+1-555-901-2345',
    kycStatus: CONSTANTS.REJECTED,
    accountStatus: CONSTANTS.ACTIVE,
  },
];
