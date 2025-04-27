import {
  Avatar,
  Box,
  Card,
  CardBody,
  HStack,
  Icon,
  Progress,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import { IoDocumentText } from 'react-icons/io5';
import { useLocation } from 'react-router';

import { Modal, PDFViewer, Skeleton } from '@/components';
import { useErrorNotification } from '@/hooks';
import { decryptUrlParams, downloadFile } from '@/utils';

import { useGetUserDetails } from '../../apis';

export const UserDetails = () => {
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState('');
  const [document, setDocument] = useState('');

  const { isOpen, onClose, onOpen } = useDisclosure();

  const urlParameters = decryptUrlParams(location.search) as { userId: string };
  const { data: user, isError, isPending, error } = useGetUserDetails(Number(urlParameters.userId));

  const userDetails = [
    {
      name: 'Email',
      value: user?.data.kyc?.email,
    },
    {
      name: 'Phone number',
      value: user?.data.phoneNumber,
    },
    {
      name: 'Country',
      value: user?.data.kyc?.idVerificationCountry,
    },
  ];

  useEffect(() => {
    if (user && user?.data.kyc?.profilePicture) {
      setImageSrc(user?.data.kyc?.profilePicture);
    }
    if (user?.data.kyc?.idVerificationFile) {
      setDocument(user?.data.kyc?.idVerificationFile);
    }
  });

  useErrorNotification({
    name: 'user-details',
    description: error?.message ?? 'Error retrieving user',
    isError,
  });
  return (
    <Box minH="100vh" px={{ base: 4, md: 6, lg: 8, xl: 12 }} pb={12}>
      <Skeleton isError={isError} isLoading={isPending}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={6}>
          <Box w={{ base: 'full', lg: '40%' }}>
            <Card>
              <CardBody as={Stack} p={4} spacing={4}>
                <Stack alignItems="center" w="full" spacing={4}>
                  <Avatar src={`data:image/jpeg;base64,${imageSrc}`} boxSize="120px" />
                  <Text fontFamily="body" color="black.800" fontSize="md">
                    {`${user?.data.kyc?.firstName}-${user?.data.kyc?.lastName}`}
                  </Text>
                  <Box rounded="4px" p={3} bgColor="blue.100" w="full">
                    <Text fontFamily="body" fontSize="sm" pb={2}>
                      Your profile is 25% complete
                    </Text>
                    <Progress
                      sx={{
                        '& > div': {
                          background: 'blue.300',
                          rounded: '10px',
                        },
                      }}
                      value={25}
                      backgroundColor="grey.300"
                      rounded="10px"
                    />
                  </Box>
                </Stack>

                {userDetails.map((user) => (
                  <Box key={user.name} pb={2}>
                    <Text fontFamily="inter" fontSize="md" color="black.300" fontWeight="light">
                      {user.name}
                    </Text>
                    <Text fontFamily="inter" fontSize="md" fontWeight="normal">
                      {user.value}
                    </Text>
                  </Box>
                ))}
              </CardBody>
            </Card>
            {document && (
              <>
                <Modal
                  id="pdf-viewer"
                  isOpen={isOpen}
                  onClose={onClose}
                  body={
                    <Stack>
                      <HStack _hover={{ cursor: 'pointer' }} onClick={() => downloadFile(document)}>
                        <Icon boxSize={7} as={HiOutlineDocumentDownload} />
                        <Text fontSize="lg" fontFamily="body" color="primary.800">
                          Download File
                        </Text>
                      </HStack>
                      <PDFViewer base64String={document} />
                    </Stack>
                  }
                  styles={{ width: '60%' }}
                />

                {/* <Button onClick={downloadPdf} mt={4}>
                  Download PDF
                </Button> */}
              </>
            )}
          </Box>

          <Stack flex={1} spacing={4}>
            <Stack spacing={4}>
              <Text fontSize="xl" color="black.500" fontFamily="body" fontWeight="semibold">
                ID Document details
              </Text>
              <Box p={3} bgColor="blue.50" borderRadius="8px">
                <Icon as={IoDocumentText} boxSize={10} color="primary.800" />
                <Text
                  fontFamily="body"
                  fontSize="lg"
                  color="black.500"
                  pt={2}
                  _hover={{ cursor: 'pointer' }}
                  onClick={onOpen}
                >
                  View Document
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Skeleton>
    </Box>
  );
};
