import { Box, Button, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import bgImg1 from '@/assets/images/login-img-1.png';
import bgImg2 from '@/assets/images/login-img-2.png';
import bgImg3 from '@/assets/images/login-img-3.png';
import logoImg from '@/assets/images/logo.png';
import { FormInput } from '@/components';
import { LINKS } from '@/constants';

import { useForgotPassword } from '../apis';

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
});
export const ForgotPassword = () => {
  const navigate = useNavigate();

  const forgotPasswordMutation = useForgotPassword();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      forgotPasswordMutation.mutate(values.email);
    },
  });

  const handleSignIn = () => {
    navigate(LINKS.LOGIN);
  };
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

                <Button
                  rounded="4px"
                  type="submit"
                  _hover={{ bgColor: 'primary.800' }}
                  isLoading={forgotPasswordMutation.isPending}
                >
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
