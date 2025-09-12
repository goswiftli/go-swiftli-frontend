import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  SystemStyleObject,
  Stack,
  Icon,
  Center,
} from '@chakra-ui/react';
import React, { JSX } from 'react';
import { PiSealWarningFill } from 'react-icons/pi';

import { Pagination } from '../Pagination';

export type TableColumn<Entry> = {
  title?: string;
  field?: keyof Entry;
  Cell?: ({ entry }: { entry: Entry }) => JSX.Element;
  Cell2?: () => JSX.Element;
};

type TableProps<Entry> = {
  data: Entry[] | undefined;
  columns: TableColumn<Entry>[];
  currentPage: number;
  totalPages: number;
  handlePage: ({ selected }: { selected: number }) => void;
  uniqueKey: keyof Entry;
  emptyData: {
    title: string;
    body: string;
  };
  pageNext?: {
    isFirstPage: boolean;
    isLastPage: boolean;
  };
  variant?: string;
};

export const Table = <Entry extends Record<string, any>>({
  data,
  columns,
  currentPage,
  totalPages,
  handlePage,
  uniqueKey,
  emptyData,
  pageNext,
  variant,
}: TableProps<Entry>) => {
  if (!data?.length) {
    return (
      <Stack width="100%" justifyContent="center" alignItems="center" bgColor="white" h={80}>
        <Center bgColor="primary.200" boxSize="80px" rounded="full">
          <Icon boxSize="40px" as={PiSealWarningFill} fill="primary.400" />
        </Center>
        <Box pt={4} textAlign="center">
          <Text fontFamily="body" color="black.600" fontSize="md" fontWeight="semibold">
            {emptyData.title}
          </Text>
          <Text fontFamily="body" fontWeight="medium" fontSize="md" color="black.600">
            {emptyData.body}
          </Text>
        </Box>
      </Stack>
    );
  }
  return (
    <Box w="100%" overflow="auto" bgColor="white">
      <TableContainer sx={scrollbarSx} maxW="-moz-max-content">
        <ChakraTable variant={variant ?? 'unstyled'}>
          <Thead>
            <Tr>
              {columns.map(({ title, Cell2 }, index) => (
                <Th fontSize="sm" key={`${index}-${title}`}>
                  {Cell2 ? <Cell2 /> : title}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((entry, index) => {
              return (
                <Tr key={`${entry[uniqueKey]} ${index}`}>
                  {columns.map(({ field, Cell, title }, columnIndex) => (
                    <React.Fragment key={`${columnIndex}-${title}`}>
                      <Td
                        maxWidth="180px"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {Cell ? (
                          <Cell entry={entry} />
                        ) : (
                          field && ((entry[field] as React.ReactNode) || 'N/A')
                        )}
                      </Td>
                    </React.Fragment>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </ChakraTable>
      </TableContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePage={handlePage}
        pageNext={pageNext}
      />
    </Box>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const scrollbarSx: SystemStyleObject = {
  '&::-webkit-scrollbar': {
    height: '5px',
    position: 'sticky',
    top: '0',
    backgroundColor: '#ccc',
    opacity: '0.3',
    width: '0px',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '1em',
    backgroundColor: '#C1C1C1',
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
  },
};
