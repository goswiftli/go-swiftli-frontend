import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoDocumentText } from 'react-icons/io5';
import * as yup from 'yup';

import { useGetCountries } from '@/apis';
import driverLicenseImg from '@/assets/images/drivers-license.png';
import idCardImg from '@/assets/images/id-card.png';
import passportImg from '@/assets/images/passport.png';
import { FormSelect } from '@/components';
import { CONSTANTS } from '@/constants';
import { useToast } from '@/hooks';
import {
  convertUnderscoreToSpace,
  deleteFileFromIdb,
  getFileFromIdb,
  saveDataToSessStorage,
  saveFileToIdb,
  transformDataToOptions,
} from '@/utils';

import { IdentificationInfo, IdType } from '../../types';

const validationSchema = yup.object().shape({
  country: yup.string().required().label('Country'),
});

type IdVerificationProps = {
  handleNext: () => void;
  handlePrevious: () => void;
  identification: IdentificationInfo | null;
  setIdentification: React.Dispatch<React.SetStateAction<IdentificationInfo | null>>;
};

export const IdVerification = ({
  handleNext,
  handlePrevious,
  setIdentification,
  identification,
}: IdVerificationProps) => {
  const toast = useToast();
  const { data: countries } = useGetCountries();
  const countryOptions = transformDataToOptions(
    countries,
    (item) => item.name.common,
    (item) => item.name.common
  );

  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const handleFile = (fileType: string) => {
    const input = inputRefs.current[fileType];
    if (input) {
      input.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE = 4 * 1024 * 1024; // 5MB
    const isValidType = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type);
    const isValidSize = file.size <= MAX_FILE_SIZE;
    if (!isValidType) {
      toast({
        id: 'invalid-file',
        title: 'Invalid File Type',
        description: 'Only PDFs and images (JPG, PNG) are allowed',
        status: 'error',
        duration: 3000,
      });
      e.target.value = '';
    } else if (!isValidSize) {
      toast({
        id: 'invalid-size',
        title: 'File too large',
        description: 'maximum file size is 4MB',
        status: 'error',
        duration: 3000,
      });
      e.target.value = '';
    } else {
      setIdentification({
        country: '',
        fileDetails: { file: file, name: file.name, size: file.size, type: fileType as IdType },
      });
    }
  };
  const removeSelectedFile = async () => {
    await deleteFileFromIdb(identification?.fileDetails.type ?? '');
    setIdentification({} as IdentificationInfo);
  };
  useEffect(() => {
    const fetchData = async () => {
      const keysToCheck = [CONSTANTS.ID_CARD, CONSTANTS.PASSPORT, CONSTANTS.DRIVING_LICENSE];

      const results = await Promise.all(
        keysToCheck.map(async (key) => {
          const data = (await getFileFromIdb(key)) as {
            id: IdType;
            country: string;
            file: File;
          } | null;
          return data ? { ...data, key } : null;
        })
      );

      // Filter out empty results
      const validResults = results.filter(Boolean) as {
        id: IdType;
        country: string;
        file: File;
        key: string;
      }[];

      if (validResults.length > 0) {
        const data = validResults[0];

        setIdentification({
          country: data.country,
          fileDetails: {
            type: data.id,
            name: data.file.name,
            size: data.file.size,
            file: data.file,
          },
        });

        saveDataToSessStorage('identification-details', {
          fileDetails: {
            type: data.id,
            name: data.file.name,
            size: data.file.size,
          },
        });
      }
    };

    fetchData();
  }, [identification?.fileDetails]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      country: identification?.country ?? '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (identification && identification.fileDetails === null) {
        toast({
          id: 'no-file',
          description: 'Please add an identification? document',
          status: 'error',
          duration: 3000,
        });
      } else {
        await saveFileToIdb({
          key: identification?.fileDetails.type ?? '',
          data: {
            country: values.country,
            file: identification?.fileDetails.file,
            fileType: identification?.fileDetails.type,
            name: identification?.fileDetails.file.name,
            size: identification?.fileDetails.file.size,
            updatedAt: new Date(),
          },
        });
        handleNext();
      }
    },
  });

  return (
    <Box>
      <Stack spacing={6}>
        <Box>
          <Text fontFamily="lato" fontSize="md" color="black.400">
            Step 2/4
          </Text>
          <Text fontFamily="lato" fontSize="lg">
            Intermediate Verification
          </Text>
          <Text fontFamily="lato" fontSize="md" color="black.400">
            Fill in the parts inside completing the interviewer’s personal
          </Text>
        </Box>
        <Divider borderColor="grey.300" />
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={6}>
            <FormSelect
              label="Select document issue country"
              name="country"
              placeholder="Select country"
              options={countryOptions}
              value={formik.values.country}
              isInvalid={formik.touched.country && Boolean(formik.errors.country)}
              onChange={formik.handleChange}
              errorMessage={formik.touched.country && formik.errors.country}
            />
            {identification && identification.fileDetails && (
              <HStack
                p={2}
                bgColor="grey.100"
                rounded="8px"
                spacing={4}
                justifyContent="space-between"
                alignItems="start"
                pos="relative"
                border="1px solid"
                borderColor="grey.200"
              >
                <Box as={HStack}>
                  <Icon as={IoDocumentText} color="primary.800" boxSize="30px" />
                  <Box fontFamily="body" fontSize="md">
                    <Text fontWeight="semibold">
                      {convertUnderscoreToSpace(identification.fileDetails.type)}
                    </Text>
                    <Text color="black.400">{identification.fileDetails.file?.name}</Text>
                  </Box>
                </Box>
                <Box
                  _hover={{ cursor: 'pointer' }}
                  pos="relative"
                  top="-15px"
                  onClick={removeSelectedFile}
                >
                  <Icon boxSize="20px" as={IoMdCloseCircle} color="error.400" />
                </Box>
              </HStack>
            )}

            <Stack>
              {idItems.map((item) => (
                <Box
                  key={item.name}
                  px={3}
                  py={2}
                  rounded="12px"
                  border="1px solid"
                  borderColor="grey.200"
                  _hover={{ cursor: 'pointer' }}
                  onClick={() => handleFile(item.name)}
                >
                  <Input
                    type="file"
                    accept="image/*,application/pdf"
                    ref={(el) => {
                      inputRefs.current[item.name] = el;
                    }}
                    onChange={(e) => handleChange(e, item.value)}
                    display="none"
                  />
                  <Stack direction="row" spacing={4}>
                    <Image src={item.image} alt={item.name} boxSize="50px" rounded="full" />
                    <Box>
                      <Text fontFamily="body" fontSize="lg" fontWeight="semibold">
                        {item.name}
                      </Text>
                      <Text fontFamily="body" color="black.400" fontSize="md">
                        {item.desc}
                      </Text>
                    </Box>
                  </Stack>
                </Box>
              ))}

              <Flex w="full" justifyContent="end">
                <HStack w={{ base: '50%', lg: '30%' }} justifyContent="flex-end">
                  <Button variant="ghost" rounded="6px" onClick={handlePrevious}>
                    Back
                  </Button>
                  <Button rounded="6px" w="full" type="submit">
                    Next
                  </Button>
                </HStack>
              </Flex>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

const idItems = [
  {
    name: 'ID Card',
    value: CONSTANTS.ID_CARD,
    desc: 'Create your account with ID card',
    image: idCardImg,
  },
  {
    name: 'Driving License',
    value: CONSTANTS.DRIVING_LICENSE,
    desc: 'Create your account with Driving License',
    image: driverLicenseImg,
  },
  {
    name: 'Passport',
    value: CONSTANTS.PASSPORT,
    desc: 'Create your account with Passport',
    image: passportImg,
  },
];
