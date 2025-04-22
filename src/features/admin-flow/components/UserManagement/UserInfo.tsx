import {
  Flex,
  HStack,
  Icon,
  Table,
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
  hasEditBtn?: boolean;
};

export const UserInfo = ({ headerName, column, hasEditBtn }: UserInfoProps) => {
  return (
    <TableContainer bgColor="white" rounded="18px 18px 0 0">
      <Table variant="simple" size="md">
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
            <Tr key={index}>
              <Td whiteSpace="normal" maxW="60%">
                {data.name}
              </Td>
              <Td>
                <Flex justifyContent="flex-end">{data.value}</Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
