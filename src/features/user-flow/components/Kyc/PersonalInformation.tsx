import { Box, Button, Divider, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FormInput } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux';
import { saveDataToSessStorage } from '@/utils';

import { setPersonalInfo } from '../../userFlowSlice';

const validationSchema = yup.object().shape({
  firstName: yup.string().required().label('First Name'),
  lastName: yup.string().required().label('Last Name'),
  email: yup.string().email().required().label('Email'),
});

type PersonalInformationProps = {
  handleNext: () => void;
  handlePrevious: () => void;
  activeStep: number;
};

export const PersonalInformation = ({
  handleNext,
  handlePrevious,
  activeStep,
}: PersonalInformationProps) => {
  const dispatch = useAppDispatch();
  const { personalInfo } = useAppSelector((state) => state.userFlow);
  const formik = useFormik({
    initialValues: {
      firstName: personalInfo.firstName ?? '',
      lastName: personalInfo.lastName ?? '',
      email: personalInfo.email ?? '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      saveDataToSessStorage('kyc-per-info', values);
      dispatch(setPersonalInfo({ ...values }));
      handleNext();
    },
  });

  return (
    <Box>
      <Stack spacing={6}>
        <Box>
          <Text fontFamily="lato" fontSize="md" color="black.400">
            Step 1/4
          </Text>
          <Text fontFamily="lato" fontSize="lg">
            Verify your identity
          </Text>
          <Text fontFamily="lato" fontSize="md" color="black.400">
            Fill in the parts inside completing the interviewer’s personal
          </Text>
        </Box>
        <Divider borderColor="grey.300" />

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={6}>
            <FormInput
              label="First Name"
              placeholder="Enter first name"
              name="firstName"
              value={formik.values.firstName}
              isInvalid={formik.touched.firstName && Boolean(formik.errors.firstName)}
              onChange={formik.handleChange}
              errorMessage={formik.touched.firstName && formik.errors.firstName}
            />
            <FormInput
              label="Last Name"
              placeholder="Enter Last name"
              name="lastName"
              value={formik.values.lastName}
              isInvalid={formik.touched.lastName && Boolean(formik.errors.lastName)}
              onChange={formik.handleChange}
              errorMessage={formik.touched.lastName && formik.errors.lastName}
            />
            <FormInput
              label="Email Address"
              placeholder="Enter email address"
              name="email"
              value={formik.values.email}
              isInvalid={formik.touched.email && Boolean(formik.errors.email)}
              onChange={formik.handleChange}
              errorMessage={formik.touched.email && formik.errors.email}
            />
            <Flex w="full" justifyContent="end">
              <HStack w={{ base: '50%', lg: '30%' }} justifyContent="flex-end">
                <Button
                  rounded="6px"
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
                <Button rounded="6px" w="full" type="submit">
                  Next
                </Button>
              </HStack>
            </Flex>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};
