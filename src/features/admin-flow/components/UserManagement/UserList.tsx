import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router';

import { ReactComponent as LockIcon } from '@/assets/icons/lock.svg';
import { AppTable } from '@/components';
import { CONSTANTS, LINKS } from '@/constants';
import { KycStatus } from '@/features/user-flow';
import { checkStatusType, createEncryptedUrlParams, returnString } from '@/utils';

import { prefetchUserDetails } from '../../apis';
import { UserDTO } from '../../types';

type UserListProps = {
  users: UserDTO[];
  currentPage: number;
  handlePage: ({ selected }: { selected: number }) => void;
  totalPages: number;
};

export const UserList = ({ users }: UserListProps) => {
  const navigate = useNavigate();
  const handleViewUser = (userId: number) => {
    const queryParams = {
      userId: userId,
    };
    const encryptedParams = createEncryptedUrlParams(queryParams);
    navigate(LINKS.USER_DETAILS + encryptedParams);
  };

  const handleDeleteUser = (userId: number) => {
    console.log(userId);
  };
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const tableColumnHelper = createColumnHelper<UserDTO>();
  const tableColumns: ColumnDef<UserDTO, any>[] = [
    tableColumnHelper.accessor('email', {
      id: 'email',
      cell: (info) => (
        <Text as="span">
          {returnString(info.row.original.kyc?.firstName, info.row.original.kyc?.lastName)}
        </Text>
      ),
      header: () => <Box as="span">Name</Box>,
    }),
    tableColumnHelper.accessor('username', {
      id: 'username',
      cell: (info) => info.getValue(),
      header: () => <Box as="span">Email</Box>,
    }),
    tableColumnHelper.accessor('phoneNumber', {
      id: 'phoneNumber',
      cell: (info) => returnString(info.getValue()),
      header: () => <Box as="span">Phone Number</Box>,
    }),
    tableColumnHelper.accessor('kyc.kycStatus', {
      id: 'kycStatus',
      cell: (info) =>
        checkStatusType(info.row.original.kyc?.kycStatus || (CONSTANTS.PENDING as KycStatus)),
      header: () => <Box as="span">Kyc Status</Box>,
    }),
    tableColumnHelper.display({
      id: 'actions',
      cell: (info) => (
        <HStack>
          <Box
            onMouseEnter={() => prefetchUserDetails(info.row.original.id)}
            onClick={() => handleViewUser(info.row.original.id)}
            _hover={{ cursor: 'pointer' }}
          >
            <Icon color="black.700" as={FaEye} boxSize={8} />
          </Box>
          <Box
            onClick={() => handleDeleteUser(info.row.original.id)}
            _hover={{ cursor: 'pointer' }}
          >
            <Icon as={LockIcon} boxSize={8} />
          </Box>
        </HStack>
      ),
    }),
  ];

  return (
    <AppTable
      columns={tableColumns}
      pagination={pagination}
      setPagination={setPagination}
      data={users || []}
      isServerSide
    />
  );
};
