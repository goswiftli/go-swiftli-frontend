import { Button, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import logoImg from '@/assets/images/logo.png';
import { FormInputPassword } from '@/components';
import { LINKS } from '@/constants';

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required()
    .label('Password')
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Use at least 1 uppercase and lowercase letter, 1 number, and 1 symbol'
    ),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm Password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export const ChangePassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      navigate(LINKS.LOGIN);
      console.log(values);
    },
  });

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
              <Stack pt={20} pb={6} spacing={6} w="full">
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
                  placeholder="Password Confirmation"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  isInvalid={
                    formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                  }
                  onChange={formik.handleChange}
                  errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />

                <Button rounded="4px" type="submit" _hover={{ bgColor: 'primary.800' }}>
                  Set new password
                </Button>
              </Stack>
            </form>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};
