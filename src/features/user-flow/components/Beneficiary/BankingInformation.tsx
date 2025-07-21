import { Box, Button, Flex, HStack, Stack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import { FormInput, FormSelect } from '@/components';
import { useAppDispatch, useAppSelector } from '@/redux';
import { saveDataToSessStorage } from '@/utils';

import { setBeneficiaryInformation } from '../../userFlowSlice';

type BankingInformationProps = {
  handleNext: () => void;
  handlePrevious: () => void;
};

const validationSchema = yup.object().shape({
  currency: yup.string().required().label('Currency'),
  accountType: yup.string().required().label('Account Type'),
  accountName: yup.string().required().label('Account Name'),
  achRoutingNumber: yup
    .string()
    .label('ACH Routing number')
    .when('paymentMethod', {
      is: 'ACH',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    }),
  bankName: yup.string().required().label('Bank Name'),
  accountNumber: yup.string().required().label('Account Number'),
});

export const BankingInformation = ({ handleNext, handlePrevious }: BankingInformationProps) => {
  const dispatch = useAppDispatch();
  const { beneficiaryInformation } = useAppSelector((state) => state.userFlow);

  const formik = useFormik({
    initialValues: {
      currency: beneficiaryInformation.bankInformation?.currency ?? '',
      accountType: beneficiaryInformation.bankInformation?.accountType ?? '',
      accountName: beneficiaryInformation.bankInformation?.accountName ?? '',
      achRoutingNumber: beneficiaryInformation.bankInformation?.achRoutingNumber ?? '',
      bankName: beneficiaryInformation.bankInformation?.bankName ?? '',
      accountNumber: beneficiaryInformation.bankInformation?.accountNumber ?? '',
      paymentMethod: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      saveDataToSessStorage('beneficiary-info', {
        ...beneficiaryInformation,
        bankInformation: { ...values },
      });
      dispatch(
        setBeneficiaryInformation({
          ...beneficiaryInformation,
          bankInformation: { ...values },
        })
      );
      handleNext();
    },
  });

  const [selectedBtn, setSelectedBtn] = useState('DOMESTIC_WIRE');
  const handleClick = (btnName: string) => {
    setSelectedBtn(btnName);
    formik.setFieldValue('paymentMethod', btnName);
  };

  const isSelectedAch = selectedBtn === 'ACH';

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack justifyContent="center" alignItems="center">
          <Stack
            w={{ base: 'full', lg: '80%' }}
            spacing={{ base: 6, lg: 12 }}
            direction={{ base: 'column', lg: 'row' }}
          >
            <Stack w="full" spacing={6}>
              <Box w="full">
                <FormSelect
                  label="Currency"
                  placeholder="Select currency"
                  name="currency"
                  options={currencyOptions}
                  value={formik.values.currency}
                  isInvalid={formik.touched.currency && Boolean(formik.errors.currency)}
                  onChange={formik.handleChange}
                  errorMessage={formik.touched.currency && formik.errors.currency}
                />
                <HStack pt={6} spacing={4}>
                  <Button
                    w="50%"
                    variant={isSelectedAch ? 'primary' : 'tertiary'}
                    onClick={() => handleClick('ACH')}
                  >
                    ACH
                  </Button>
                  <Button
                    w="50%"
                    variant={selectedBtn === 'DOMESTIC_WIRE' ? 'primary' : 'tertiary'}
                    onClick={() => handleClick('DOMESTIC_WIRE')}
                  >
                    Domestic wire
                  </Button>
                </HStack>
              </Box>

              {isSelectedAch && (
                <FormInput
                  label="ACH routing number"
                  placeholder="Enter routing number"
                  name="achRoutingNumber"
                  value={formik.values.achRoutingNumber}
                  isInvalid={
                    formik.touched.achRoutingNumber && Boolean(formik.errors.achRoutingNumber)
                  }
                  onChange={formik.handleChange}
                  errorMessage={formik.touched.achRoutingNumber && formik.errors.achRoutingNumber}
                />
              )}

              <FormInput
                label="Bank Name"
                placeholder="Enter Bank Name"
                name="bankName"
                value={formik.values.bankName}
                isInvalid={formik.touched.bankName && Boolean(formik.errors.bankName)}
                onChange={formik.handleChange}
                errorMessage={formik.touched.bankName && formik.errors.bankName}
              />
              <FormInput
                label="Account Number"
                placeholder="Enter Account Number"
                name="accountNumber"
                value={formik.values.accountNumber}
                isInvalid={formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
                onChange={formik.handleChange}
                errorMessage={formik.touched.accountNumber && formik.errors.accountNumber}
              />
            </Stack>
            <Stack spacing={6} w="full">
              <FormSelect
                label="Account Type"
                placeholder="Enter Account Type"
                name="accountType"
                options={accountTypeOptions}
                value={formik.values.accountType}
                isInvalid={formik.touched.accountType && Boolean(formik.errors.accountType)}
                onChange={formik.handleChange}
                errorMessage={formik.touched.accountType && formik.errors.accountType}
              />
              <FormInput
                label="Account Name"
                placeholder="Enter Account Name"
                name="accountName"
                value={formik.values.accountName}
                isInvalid={formik.touched.accountName && Boolean(formik.errors.accountName)}
                onChange={formik.handleChange}
                errorMessage={formik.touched.accountName && formik.errors.accountName}
              />
            </Stack>
          </Stack>
          <Flex w="full" justifyContent="end">
            <HStack w={{ base: '50%', lg: '30%' }} justifyContent="flex-end">
              <Button rounded="6px" variant="ghost" onClick={handlePrevious}>
                Back
              </Button>
              <Button w="full" type="submit">
                Continue
              </Button>
            </HStack>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};

const currencyOptions = [
  {
    label: 'US Dollar ($)',
    value: 'USD',
  },
  {
    label: 'Naira',
    value: 'Naira',
  },
];
const accountTypeOptions = [
  {
    label: 'Savings',
    value: 'SAVINGS',
  },
  {
    label: 'Current',
    value: 'CURRENT',
  },
];
