import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
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

import { Approve, Modal, PDFViewer, RejectRequest, Skeleton } from '@/components';
import { CONSTANTS } from '@/constants';
import { ApproveKyc, useApproveKyc } from '@/features/user-flow';
import { useErrorNotification } from '@/hooks';
import { decryptUrlParams, downloadFile } from '@/utils';

import { useGetUserDetails } from '../../apis';

export const UserDetails = () => {
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState('');
  const [document, setDocument] = useState('');

  const { isOpen, onClose, onOpen } = useDisclosure();

  const urlParameters = decryptUrlParams(location.search) as { userId: number };
  const userId = Number(urlParameters.userId);
  const { data: user, isError, isPending, error } = useGetUserDetails(userId);
  const isKycStatus = user?.data?.kyc?.kycStatus === CONSTANTS.PENDING;
  const userDetails = [
    {
      name: 'Email',
      value: user?.data?.kyc?.email,
    },
    {
      name: 'Phone number',
      value: user?.data?.phoneNumber,
    },
    {
      name: 'Country',
      value: user?.data?.kyc?.idVerificationCountry,
    },
  ];

  useEffect(() => {
    if (user && user?.data?.kyc?.profilePicture) {
      setImageSrc(user?.data?.kyc?.profilePicture);
    }
    if (user?.data?.kyc?.idVerificationFile) {
      setDocument(user?.data?.kyc?.idVerificationFile);
    }
  });

  useErrorNotification({
    name: 'user-details',
    description: error?.message ?? 'Error retrieving user',
    isError,
  });

  const { isOpen: isOpenApr, onClose: onCloseApr, onOpen: onOpenApr } = useDisclosure();

  const approveKycMutation = useApproveKyc();
  const approveRequestHandler = async () => {
    const approveRequestBody: ApproveKyc = {
      userId: userId,
      comment: 'Approved',
      approved: true,
    };
    approveKycMutation.mutate(approveRequestBody, {
      onSuccess() {
        onCloseApr();
      },
    });
  };
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
                    {`${user?.data?.kyc?.firstName}-${user?.data?.kyc?.lastName}`}
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
          </Box>

          <Stack flex={1} spacing={4}>
            {document && (
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
            )}

            {isKycStatus && (
              <Flex justifyContent="center">
                <HStack pt={10} w="50%">
                  <Approve
                    actionHandler={approveRequestHandler}
                    text="Are you sure you wan to approve this KYC request?"
                    isLoading={approveKycMutation.isPending}
                    modalOptions={{ isOpen: isOpenApr, onClose: onCloseApr, onOpen: onOpenApr }}
                  />
                  <RejectRequest userId={userId} />
                </HStack>
              </Flex>
            )}
          </Stack>
        </Stack>
      </Skeleton>
    </Box>
  );
};
