import { Box, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { ReactComponent as EyeIcon } from '@/assets/icons/eye-icon.svg';
import { ReactComponent as LockIcon } from '@/assets/icons/lock.svg';
import { Menu, SearchBox, Table, TableColumn } from '@/components';
import { CONSTANTS } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux';
import { checkStatusType, formatDate } from '@/utils';

import { setBeneficiaryDateRange, setBeneficiaryStatus } from '../../adminFlowSlice';
import { BeneficiaryDTO } from '../../types';

export const Beneficiaries = () => {
  const dispatch = useAppDispatch();
  const { beneficiaryDateRange, beneficiaryStatus } = useAppSelector((state) => state.adminFlow);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePage = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleBeneficiaryStatus = (value: string, name: string) => {
    dispatch(setBeneficiaryStatus({ value, name }));
  };

  const handleBeneficiaryDateRange = (value: string, name: string) => {
    dispatch(setBeneficiaryDateRange({ value, name }));
  };

  const handleViewBeneficiary = (accountNumber: string) => {
    console.log(accountNumber);
  };

  const handleDeleteBeneficiary = (accountNumber: string) => {
    console.log(accountNumber);
  };
  const tableColumns: TableColumn<BeneficiaryDTO>[] = [
    {
      title: 'Beneficiary Name',
      field: 'name',
    },
    {
      title: 'Account Number',
      field: 'accountNumber',
    },
    {
      title: 'Bank Name',
      field: 'bankName',
    },

    {
      title: 'Status',
      Cell: ({ entry }) => checkStatusType(entry.status),
    },
    {
      title: 'Date',
      Cell: ({ entry }) => <Text as="span">{formatDate(entry.date).dateTime}</Text>,
    },
    {
      title: 'ACTIONS',
      Cell: ({ entry }) => (
        <HStack>
          <Box
            onClick={() => handleViewBeneficiary(entry.accountNumber)}
            _hover={{ cursor: 'pointer' }}
          >
            <Icon as={EyeIcon} boxSize={8} />
          </Box>
          <Box
            onClick={() => handleDeleteBeneficiary(entry.accountNumber)}
            _hover={{ cursor: 'pointer' }}
          >
            <Icon as={LockIcon} boxSize={8} />
          </Box>
        </HStack>
      ),
    },
  ];
  return (
    <section>
      <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} overflowX="hidden">
        <Stack alignItems="end" py={4}>
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            w={{ base: 'full', lg: '70%', xl: '50%' }}
            justifyContent="end"
            spacing={{ base: 4, lg: 2 }}
            pb={4}
          >
            <Box w={{ base: 'full', lg: '60%' }}>
              <SearchBox placeholder="Search by transaction ID, Name" />
            </Box>
            <HStack flex={1}>
              <Box w="full">
                <Menu
                  styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
                  menuItems={beneficiaryStatusItems}
                  handleClick={handleBeneficiaryStatus}
                  selectedMenuItem={beneficiaryStatus.name}
                  placement="bottom"
                />
              </Box>

              <Box w="full">
                <Menu
                  styles={{ bgColor: 'primary.50', borderColor: 'primary.800' }}
                  menuItems={[{ label: 'date', value: 'date' }]}
                  handleClick={handleBeneficiaryDateRange}
                  selectedMenuItem={beneficiaryDateRange.name}
                  placement="left-start"
                />
              </Box>
            </HStack>
          </Stack>
          <Table
            columns={tableColumns}
            data={beneficiaries}
            currentPage={currentPage}
            handlePage={handlePage}
            emptyData={{
              title: 'No Beneficiary found',
              body: 'All Beneficiaries available will appear here',
            }}
            totalPages={1}
            uniqueKey="accountNumber"
          />
        </Stack>
      </Box>
    </section>
  );
};

const beneficiaryStatusItems = [
  {
    label: 'Active',
    value: 'ACTIVE',
  },
  {
    label: 'Blacklisted',
    value: 'BLACKLISTED',
  },
];
const beneficiaries: BeneficiaryDTO[] = [
  {
    name: 'Ada Obi',
    accountNumber: '0123456789',
    bankName: 'First Bank',
    status: CONSTANTS.ACTIVE,
    date: '2025-09-01T10:30:00Z',
  },
  {
    name: 'John Doe',
    accountNumber: '1234567890',
    bankName: 'GTBank',
    status: CONSTANTS.BLACKLISTED,
    date: '2025-09-02T09:15:00Z',
  },
  {
    name: 'Lola Adebayo',
    accountNumber: '2345678901',
    bankName: 'Access Bank',
    status: CONSTANTS.ACTIVE,
    date: '2025-09-03T14:00:00Z',
  },
  {
    name: 'Chidi Nwosu',
    accountNumber: '3456789012',
    bankName: 'Zenith Bank',
    status: CONSTANTS.ACTIVE,
    date: '2025-09-04T16:45:00Z',
  },
  {
    name: 'Fatima Yusuf',
    accountNumber: '4567890123',
    bankName: 'UBA',
    status: CONSTANTS.BLACKLISTED,
    date: '2025-09-05T11:20:00Z',
  },
  {
    name: 'Tunde Akande',
    accountNumber: '5678901234',
    bankName: 'Stanbic IBTC',
    status: CONSTANTS.ACTIVE,
    date: '2025-09-06T13:10:00Z',
  },
  {
    name: 'Zainab Bello',
    accountNumber: '6789012345',
    bankName: 'Fidelity Bank',
    status: CONSTANTS.ACTIVE,
    date: '2025-09-07T17:30:00Z',
  },
  {
    name: 'Michael Eze',
    accountNumber: '7890123456',
    bankName: 'Sterling Bank',
    status: CONSTANTS.BLACKLISTED,
    date: '2025-09-08T08:25:00Z',
  },
  {
    name: 'Amina Sule',
    accountNumber: '8901234567',
    bankName: 'EcoBank',
    status: CONSTANTS.ACTIVE,
    date: '2025-09-09T12:00:00Z',
  },
  {
    name: 'Emeka Okafor',
    accountNumber: '9012345678',
    bankName: 'Wema Bank',
    status: CONSTANTS.BLACKLISTED,
    date: '2025-09-10T15:50:00Z',
  },
];
