import {
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
    name: string;
    value: string;
  }[];
};

export const UserInfo = ({ headerName, column }: UserInfoProps) => {
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
              <HStack _hover={{ cursor: 'pointer' }} justifyContent="flex-end">
                <Icon as={FiEdit3} color="blue.300" boxSize="16px" />
                <Text fontFamily="body" fontSize="md" color="blue.300">
                  Edit
                </Text>
              </HStack>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {column.map((data) => (
            <Tr key={data.name}>
              <Td>{data.name}</Td>
              <Td display="flex" justifyContent="flex-end">
                {data.value}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
