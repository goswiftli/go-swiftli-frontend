import {
  Flex,
  HStack,
  Icon,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';

type UserInfoProps = {
  headerName: string;
  column: {
    name: React.ReactNode;
    value: React.ReactNode;
  }[];
  hasEditBtn?: {
    editBtnAction: () => void;
  };
  actionItem?: React.ReactNode;
  isStacked?: boolean;
};

export const UserInfo = ({
  headerName,
  column,
  hasEditBtn,
  actionItem,
  isStacked,
}: UserInfoProps) => {
  return (
    <TableContainer bgColor="white" rounded="18px 18px 0 0">
      <Table variant="simple" size="md">
        {actionItem && <TableCaption>{actionItem}</TableCaption>}
        <Thead bgColor="blue.50">
          <Tr>
            <Th
              letterSpacing="0"
              color="black"
              textTransform="capitalize"
              fontFamily="body"
              fontSize="md"
            >
              {headerName}
            </Th>
            <Th textTransform="capitalize" letterSpacing="0">
              <HStack
                _hover={{ cursor: 'pointer' }}
                justifyContent="flex-end"
                display={hasEditBtn ? 'flex' : 'none'}
                onClick={hasEditBtn?.editBtnAction}
              >
                <Icon as={FiEdit3} color="blue.300" boxSize="16px" />
                <Text fontFamily="body" fontSize="md" color="blue.300">
                  Edit
                </Text>
              </HStack>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {column.map((data, index) => (
            <Tr
              key={index}
              display={isStacked ? 'flex' : 'table-row'}
              flexDirection={isStacked ? 'column' : 'row'}
              alignItems={isStacked ? 'flex-start' : 'center'}
            >
              <Td
                whiteSpace="normal"
                maxW={isStacked ? '100%' : '60%'}
                display={isStacked ? 'block' : 'table-cell'}
              >
                {data.name}
              </Td>
              <Td display={isStacked ? 'block' : 'table-cell'} w={isStacked ? '100%' : 'auto'}>
                <Flex justifyContent={isStacked ? 'flex-start' : 'flex-end'}>{data.value}</Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
