import { Box, Button, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import bgImg1 from '@/assets/images/login-img-1.png';
import bgImg2 from '@/assets/images/login-img-2.png';
import bgImg3 from '@/assets/images/login-img-3.png';
import logoImg from '@/assets/images/logo.png';
import { FormInputPassword } from '@/components';
import { useAppSelector } from '@/redux';

import { useChangePassword } from '../apis';
import { ChangePasswordDTO } from '../types';

const validationSchema = yup.object().shape({
  oldPassword: yup.string().required().label('Old Password'),
  newPassword: yup
    .string()
    .required()
    .label('New Password')
    .min(8)
    .notOneOf([yup.ref('oldPassword')], 'New Password cannot be the same as the old password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Use at least 1 uppercase and lowercase letter, 1 number, and 1 symbol'
    ),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm Password')
    .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
});
export const ChangePassword = () => {
  const { authUser } = useAppSelector((state) => state.auth);

  const changePasswordMutation = useChangePassword();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data: ChangePasswordDTO = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        email: authUser.username,
      };
      changePasswordMutation.mutate(data);
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
          Change Password
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
            pb={12}
          >
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
              <Stack pt={20} pb={6} spacing={6} w="full" px={{ base: 2, lg: 6, xl: 12 }}>
                <FormInputPassword
                  label="Old Password"
                  name="oldPassword"
                  value={formik.values.oldPassword}
                  isInvalid={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                  onChange={formik.handleChange}
                  errorMessage={formik.touched.oldPassword && formik.errors.oldPassword}
                />
                <FormInputPassword
                  label="New Password"
                  name="newPassword"
                  value={formik.values.newPassword}
                  isInvalid={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                  onChange={formik.handleChange}
                  errorMessage={formik.touched.newPassword && formik.errors.newPassword}
                />
                <FormInputPassword
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  isInvalid={
                    formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                  }
                  onChange={formik.handleChange}
                  errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <Box pt={4} w="full" pb={12}>
                  <Button
                    w="full"
                    rounded="4px"
                    type="submit"
                    isLoading={changePasswordMutation.isPending}
                    _hover={{ bgColor: 'primary.800' }}
                  >
                    Change password
                  </Button>
                </Box>
              </Stack>
            </form>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};
