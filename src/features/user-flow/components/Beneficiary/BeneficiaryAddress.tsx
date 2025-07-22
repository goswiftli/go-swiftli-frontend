import { Box, Button, Flex, HStack, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { useGetCountries } from '@/apis';
import { FormInput, FormSelect, Modal } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux';
import { saveDataToSessStorage, transformDataToOptions } from '@/utils';

import { useCreateBeneficiary } from '../../apis';
import { CreateBeneficiaryDTO } from '../../types';
import { setBeneficiaryInformation } from '../../userFlowSlice';

type BeneficiaryAddressProps = {
  handlePrevious: () => void;
};

const validationSchema = yup.object().shape({
  country: yup.string().required().label('Country'),
  streetAddress: yup.string().required().label('Street Address'),
  state: yup.string().required().label('State'),
  city: yup.string().required().label('City'),
  postalCode: yup.string().required().label('Postal Code'),
});

export const BeneficiaryAddress = ({ handlePrevious }: BeneficiaryAddressProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { beneficiaryInformation } = useAppSelector((state) => state.userFlow);

  const { data: countries } = useGetCountries();
  const countryOptions = transformDataToOptions(
    countries,
    (item) => item.name.common,
    (item) => item.name.common
  );

  const createBeneficiaryMutation = useCreateBeneficiary();
  const formik = useFormik({
    initialValues: {
      country: beneficiaryInformation.beneficiaryAddress?.country ?? '',
      streetAddress: beneficiaryInformation.beneficiaryAddress?.streetAddress ?? '',
      state: beneficiaryInformation.beneficiaryAddress?.state ?? '',
      city: beneficiaryInformation.beneficiaryAddress?.city ?? '',
      postalCode: beneficiaryInformation.beneficiaryAddress?.postalCode ?? '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      saveDataToSessStorage('beneficiary-info', {
        ...beneficiaryInformation,
        beneficiaryAddress: { ...values },
      });
      dispatch(
        setBeneficiaryInformation({
          ...beneficiaryInformation,
          beneficiaryAddress: { ...values },
        })
      );
      const beneficiaryData = {
        name: beneficiaryInformation.bankInformation?.accountName,
        bankName: beneficiaryInformation.bankInformation?.bankName,
        accountNumber: beneficiaryInformation.bankInformation?.accountNumber,
      };
      createBeneficiaryMutation.mutate(beneficiaryData as CreateBeneficiaryDTO, {
        onSuccess() {
          onOpen();
        },
      });
    },
  });
  const handleNavigate = () => {
    onClose();
    navigate(-1);
  };
  return (
    <Box>
      <Modal
        id="review-process"
        isOpen={isOpen}
        onClose={onClose}
        styles={{ w: { base: 'full', lg: '50%', xl: '40%' } }}
        body={
          <Stack h="full" justifyContent="center" alignItems="center" spacing={12}>
            <Text
              fontFamily="body"
              textAlign="center"
              fontWeight="semibold"
              fontSize={{ base: '2xl', md: '3xl', xl: '4xl' }}
            >
              Beneficiary added successfully
            </Text>

            <Button onClick={handleNavigate}>Go to Dashboard</Button>
          </Stack>
        }
      />
      <form onSubmit={formik.handleSubmit}>
        <Stack justifyContent="center" alignItems="center">
          <Stack spacing={6} w={{ base: 'full', lg: '50%' }}>
            <FormSelect
              label="Country"
              placeholder="Enter country"
              name="country"
              options={countryOptions}
              value={formik.values.country}
              isInvalid={formik.touched.country && Boolean(formik.errors.country)}
              onChange={formik.handleChange}
              errorMessage={formik.touched.country && formik.errors.country}
            />
            <FormInput
              label="Street Address"
              placeholder="Enter street address"
              name="streetAddress"
              value={formik.values.streetAddress}
              isInvalid={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
              onChange={formik.handleChange}
              errorMessage={formik.touched.streetAddress && formik.errors.streetAddress}
            />
            <FormInput
              label="State"
              placeholder="Enter State"
              name="state"
              value={formik.values.state}
              isInvalid={formik.touched.state && Boolean(formik.errors.state)}
              onChange={formik.handleChange}
              errorMessage={formik.touched.state && formik.errors.state}
            />
            <FormInput
              label="City"
              placeholder="Enter City"
              name="city"
              value={formik.values.city}
              isInvalid={formik.touched.city && Boolean(formik.errors.city)}
              onChange={formik.handleChange}
              errorMessage={formik.touched.city && formik.errors.city}
            />
            <FormInput
              label="Postal Code"
              placeholder="Enter Postal code"
              name="postalCode"
              value={formik.values.postalCode}
              isInvalid={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
              onChange={formik.handleChange}
              errorMessage={formik.touched.postalCode && formik.errors.postalCode}
            />
          </Stack>
          <Flex w="full" justifyContent="end">
            <HStack w={{ base: '50%', lg: '30%' }} justifyContent="flex-end">
              <Button rounded="6px" variant="ghost" onClick={handlePrevious}>
                Back
              </Button>
              <Button
                _hover={{ bgColor: 'primary.800' }}
                w="full"
                type="submit"
                isLoading={createBeneficiaryMutation.isPending}
              >
                Save
              </Button>
            </HStack>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};
