import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import * as yup from 'yup';

import logoImg from '@/assets/images/logo.png';
import bgImg2 from '@/assets/images/sign-bg-2.png';
import bgImg1 from '@/assets/images/signup-bg-1.png';
import bgImg3 from '@/assets/images/signup-bg-3.png';
import { Form, FormInput, FormInputPassword } from '@/components';

import { useSignup } from '../apis';

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  countryCode: yup.string().required().label('Country code'),
  number: yup
    .string()
    .required()
    .test('is-valid-phone', 'Phone number is not valid', function (value) {
      const countryCode = this.parent.countryCode;
      if (countryCode && value) {
        const phoneNumber = `${countryCode}${value}`;
        return isValidPhoneNumber(phoneNumber);
      }
      return false;
    })
    .label('Phone number'),
  password: yup
    .string()
    .required()
    .test('', 'Password cannot contain email address', function (password) {
      const value = this.parent.email
        ? password.toLowerCase().includes(this.parent.email.toLowerCase())
        : false;
      return !value;
    })
    .min(8)
    .max(50)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Use at least 1 uppercase and lowercase letter, 1 number, and 1 symbol'
    )
    .label('Password'),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm Password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export const Signup = () => {
  const [selectedCountry, setSelectedCountry] = useState('+234');

  const signupMutation = useSignup();

  const formik = useFormik({
    initialValues: {
      email: '',
      countryCode: selectedCountry,
      number: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedValues = {
        email: values.email,
        phone: values.number,
        password: values.password,
      };
      signupMutation.mutate(updatedValues);
    },
  });

  return (
    <Flex
      minH="100vh"
      bgColor="#F7F7FC"
      justifyContent="center"
      alignItems="center"
      py={12}
      pos="relative"
      zIndex={1}
      overflowX="hidden"
    >
      <Box boxSize={{ base: '50%', md: '40%', lg: '30%' }} pos="fixed" zIndex={-1} top={0} left={0}>
        <Image src={bgImg1} />
      </Box>
      <Box
        boxSize={{ base: '50%', md: '40%', lg: '30%' }}
        pos="fixed"
        zIndex={-1}
        top="0"
        right={{ base: '-20%', md: '-15%', lg: '-10%' }}
      >
        <Image src={bgImg2} />
      </Box>
      <Box
        boxSize={{ base: '40%', md: '35%', lg: '30%' }}
        pos="fixed"
        zIndex={-1}
        bottom={{ base: '-20%', xl: '0' }}
        left={'0'}
        display={{ base: 'none', md: 'block' }}
      >
        <Image src={bgImg3} />
      </Box>
      <Stack spacing={6} px={{ base: 2, lg: 4 }} w="full">
        <HStack justifyContent="center">
          <Image src={logoImg} h="57px" w="36px" />
          <Text fontFamily="lato" fontWeight="semibold" fontSize="4xl" color="black.600">
            goswiftli
          </Text>
        </HStack>
        <Text textAlign="center" fontFamily="lato" fontSize="4xl" fontWeight="bold">
          Create your account
        </Text>

        <Flex justifyContent="center" alignItems="center">
          <Flex
            bgColor="white"
            rounded="8px"
            boxShadow="0px 4px 4px 0px #00000040"
            px={{ base: 4, md: 8, lg: 12 }}
            justifyContent="center"
            alignItems="center"
            w={{ base: 'full', md: '80%', lg: '40%' }}
          >
            <Form onSubmit={formik.handleSubmit}>
              <Stack pt={20} pb={6} spacing={6}>
                <FormInput
                  label="Email"
                  placeholder="example@xyz.com"
                  name="email"
                  value={formik.values.email}
                  isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                  onChange={formik.handleChange}
                  errorMessage={formik.touched.email && formik.errors.email}
                />
                <HStack>
                  <Box w="40%">
                    <FormControl isInvalid={!!(formik.touched.email && formik.errors.email)}>
                      <FormLabel fontWeight="medium" fontSize="lg" fontFamily="body">
                        Country Code
                      </FormLabel>

                      <PhoneInput
                        className="react-phone-number-input"
                        value={formik.values.countryCode}
                        onChange={(phone) => {
                          formik.setFieldValue('countryCode', phone);
                        }}
                        onCountryChange={(country) => {
                          if (country) {
                            setSelectedCountry(country);
                          }
                        }}
                        name="countryCode"
                        defaultCountry="NG"
                        international
                        countryCallingCodeEditable={false}
                      />

                      <FormErrorMessage
                        mt="2px"
                        fontSize={'xs'}
                        fontFamily="body"
                        fontWeight="normal"
                      >
                        {formik.errors.countryCode}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>

                  <Box flex={1}>
                    <FormInput
                      label="Phone Number"
                      placeholder="80345674"
                      name="number"
                      value={formik.values.number}
                      isInvalid={formik.touched.number && Boolean(formik.errors.number)}
                      onChange={formik.handleChange}
                      errorMessage={formik.touched.number && formik.errors.number}
                    />
                  </Box>
                </HStack>
                <FormInputPassword
                  label="Password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                  onChange={formik.handleChange}
                  errorMessage={formik.touched.password && formik.errors.password}
                />
                <FormInputPassword
                  label="Password Confirmation"
                  placeholder="Password confirmation"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  isInvalid={
                    formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                  }
                  onChange={formik.handleChange}
                  errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <Text fontFamily="body" fontSize="md" fontWeight="normal" textAlign="center">
                  Creating an account leads to you agree to GoSwiftli’s{' '}
                  <Text as="span" textDecoration="underline">
                    Terms and Condition
                  </Text>{' '}
                  and{' '}
                  <Text as="span" textDecoration="underline">
                    Privacy policy
                  </Text>
                </Text>
                <Button
                  rounded="4px"
                  type="submit"
                  isLoading={signupMutation.isPending}
                  _hover={{ bgColor: 'primary.800' }}
                >
                  Create account
                </Button>
              </Stack>
            </Form>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};
