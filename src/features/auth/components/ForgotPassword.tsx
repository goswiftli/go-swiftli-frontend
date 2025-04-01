import { Box, Button, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import logoImg from '@/assets/images/logo.png';
import { FormInput } from '@/components';
import { LINKS } from '@/constants';

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
});
export const ForgotPassword = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleSignIn = () => {
    navigate(LINKS.LOGIN);
  };
  return (
    <Flex minH="100vh" bgColor="#F7F7FC" justifyContent="center" alignItems="center" py={12}>
      <Stack spacing={6} px={{ base: 2, lg: 4 }} w="full">
        <HStack justifyContent="center">
          <Image src={logoImg} h="57px" w="36px" />
          <Text fontFamily="lato" fontWeight="semibold" fontSize="4xl" color="black.600">
            goswiftli
          </Text>
        </HStack>
        <Text textAlign="center" fontFamily="lato" fontSize="4xl" fontWeight="bold">
          Welcome Back!
        </Text>

        <Flex justifyContent="center" alignItems="center">
          <Flex
            bgColor="white"
            rounded="8px"
            boxShadow="0px 4px 4px 0px #00000040"
            px={{ base: 4, md: 8, lg: 12, xl: '4em' }}
            justifyContent="center"
            alignItems="center"
            w={{ base: 'full', md: '80%', lg: '40%' }}
          >
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <Stack pt={20} pb={6} spacing={6} w="full">
                <Box>
                  <FormInput
                    label="Email"
                    placeholder="example@xyz.com"
                    name="email"
                    value={formik.values.email}
                    isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                    onChange={formik.handleChange}
                    errorMessage={formik.touched.email && formik.errors.email}
                  />
                  <Text textAlign="end" fontWeight="normal" fontSize="md" fontFamily="body" pt={2}>
                    Please confirm your email, we will send instructions
                  </Text>
                </Box>

                <Button rounded="4px" type="submit">
                  Send Mail
                </Button>
                <Text
                  textAlign="center"
                  fontWeight="normal"
                  fontSize="md"
                  fontFamily="body"
                  pt={2}
                  pb="4em"
                >
                  Go back to{' '}
                  <Text
                    as="span"
                    onClick={handleSignIn}
                    color="blue.300"
                    _hover={{ cursor: 'pointer' }}
                  >
                    Sign in
                  </Text>
                </Text>
              </Stack>
            </form>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};
