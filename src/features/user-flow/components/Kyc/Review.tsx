import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsHourglassSplit } from 'react-icons/bs';
import { IoDocumentText } from 'react-icons/io5';

import { Modal } from '@/components';
import { UserInfo } from '@/features/admin-flow';
import { useAppSelector } from '@/redux';
import { convertUnderscoreToSpace, fileToBase64, getFileFromIdb } from '@/utils';

type ReviewProps = {
  handlePrevious: () => void;
};
export const Review = ({ handlePrevious }: ReviewProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { personalInfo, identification } = useAppSelector((state) => state.userFlow);

  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [documentDetails, setDocumentDetails] = useState<{
    file: File;
    fileType: string;
  }>(
    {} as {
      file: File;
      fileType: string;
    }
  );

  useEffect(() => {
    const returnProfilePhoto = async () => {
      const data = (await getFileFromIdb('uploaded-photo')) as { file: File };

      if (data.file) {
        const base64 = await fileToBase64(data.file);
        setImageSrc(base64);
      }
    };

    const returnIdentityDocument = async () => {
      if (!identification.fileDetails.type) return;
      const data = (await getFileFromIdb(identification.fileDetails.type)) as {
        file: File;
        fileType: string;
      };
      if (data) {
        setDocumentDetails({
          file: data.file,
          fileType: data.fileType,
        });
      }
    };
    returnProfilePhoto();
    returnIdentityDocument();
  }, []);

  const userDetails = [
    {
      name: 'First Name',
      value: personalInfo.firstName,
    },
    {
      name: 'Last Name',
      value: personalInfo.lastName,
    },
    {
      name: 'Email Address',
      value: personalInfo.email,
    },
  ];

  const handleComplete = () => {
    onOpen();
  };
  return (
    <Box>
      <Modal
        styles={{ height: '80vh' }}
        id="review-process"
        isOpen={isOpen}
        onClose={onClose}
        body={
          <Stack h="full" justifyContent="center" alignItems="center" spacing={6}>
            <Center rounded="full" bgColor="primary.800" boxSize="120px">
              <Icon boxSize="50px" as={BsHourglassSplit} color="white" />
            </Center>
            <Text
              fontFamily="body"
              textAlign="center"
              fontWeight="semibold"
              fontSize={{ base: '2xl', md: '3xl', xl: '4xl' }}
            >
              Verification being processed
            </Text>
          </Stack>
        }
      />
      <Stack spacing={6}>
        <Box>
          <Text fontFamily="lato" fontSize="md" color="black.400">
            Step 4/4
          </Text>
          <Text fontFamily="lato" fontSize="lg">
            Review Your Information
          </Text>
        </Box>

        <Stack spacing={4}>
          <Image src={imageSrc} boxSize="150px" alt="profile" objectFit="cover" />
          <HStack
            p={2}
            bgColor="grey.100"
            rounded="8px"
            spacing={4}
            justifyContent="space-between"
            alignItems="start"
            border="1px solid"
            borderColor="grey.200"
          >
            <Box as={HStack}>
              <Icon as={IoDocumentText} color="primary.800" boxSize="30px" />
              <Box fontFamily="body" fontSize="md">
                <Text fontWeight="semibold">
                  {convertUnderscoreToSpace(documentDetails.fileType)}
                </Text>
                <Text color="black.400">{documentDetails.file?.name}</Text>
              </Box>
            </Box>
          </HStack>
          <UserInfo headerName="Information Review" column={userDetails} />
        </Stack>

        <Flex w="full" justifyContent="end">
          <HStack w={{ base: '50%', lg: '30%' }} justifyContent="flex-end">
            <Button variant="ghost" rounded="6px" onClick={handlePrevious}>
              Back
            </Button>
            <Button rounded="6px" w="full" type="submit" onClick={handleComplete}>
              Complete
            </Button>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};
