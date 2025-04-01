import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  PinInput,
  PinInputField,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import logoImg from '@/assets/images/logo.png';

const validationSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{5}$/, 'OTP must be exactly 5 digits')
    .required()
    .label('OTP is required'),
});

export const VerifyEmail = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Flex minH="80vh" bgColor="#F7F7FC" justifyContent="center" alignItems="center" py={12}>
      <Stack spacing={6} px={{ base: 2, lg: 4 }}>
        <HStack justifyContent="center">
          <Image src={logoImg} h="57px" w="36px" />
          <Text fontFamily="lato" fontWeight="semibold" fontSize="4xl" color="black.600">
            goswiftli
          </Text>
        </HStack>
        <Text textAlign="center" fontFamily="lato" fontSize="4xl" fontWeight="bold">
          Verify Email
        </Text>

        <Flex justifyContent="center" alignItems="center">
          <Flex
            bgColor="white"
            rounded="8px"
            boxShadow=" 0px 4px 4px 0px #00000040"
            px={{ base: 4, md: 8, lg: 12 }}
            justifyContent="center"
            alignItems="center"
            w={{ base: 'full', md: '80%', lg: '60%' }}
            pb="4em"
          >
            <form onSubmit={formik.handleSubmit}>
              <Stack pt={20} pb={6} spacing={6}>
                <Text fontFamily="body" fontWeight="normal" fontSize="lg">
                  In order to log in to your account, provide a one-time password code that we sent
                  to
                  <Text as="span" fontWeight="bold">
                    {' '}
                    olagbemiifeoluwa@gmail.com
                  </Text>
                </Text>

                <Box>
                  <HStack justifyContent="space-around">
                    <PinInput
                      value={formik.values.otp}
                      onChange={(value) => formik.setFieldValue('otp', value)}
                      type="number"
                    >
                      <PinInputField boxSize="70px" />
                      <PinInputField boxSize="70px" />
                      <PinInputField boxSize="70px" />
                      <PinInputField boxSize="70px" />
                      <PinInputField boxSize="70px" />
                    </PinInput>
                  </HStack>
                  {formik.errors.otp && (
                    <Text mt="2px" fontSize={'xs'} color="error.400" fontFamily="body">
                      {formik.errors.otp}
                    </Text>
                  )}
                </Box>

                <Text fontFamily="body" fontSize="lg" textAlign="center">
                  Didn’t receive the OTP code?{' '}
                  <Text as="span" fontWeight="bold" _hover={{ cursor: 'pointer' }}>
                    Resend
                  </Text>{' '}
                </Text>
                <Button borderRadius="4px" type="submit">
                  Submit
                </Button>
                <Button onClick={() => navigate(-1)} borderRadius="4px" variant="tertiary">
                  Back
                </Button>
              </Stack>
            </form>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};
