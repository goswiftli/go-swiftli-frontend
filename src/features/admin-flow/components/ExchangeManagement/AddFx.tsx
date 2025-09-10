import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import * as yup from 'yup';

import { FormInput, FormSelect } from '@/components';
import { decryptUrlParams, getFormikFields } from '@/utils';

import { useCreateFx } from '../../apis';
import { Fx } from '../../types';

type AddFxProps = {
  modalOptions: {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
  };
  isEdit?: boolean;
};

const validationSchema = yup.object().shape({
  rate: yup
    .number()
    .positive('Amount must be a positive number')
    .min(100, 'Amount must be more than 100')
    .required()
    .label('Rate'),
  baseCurrency: yup.string().required().label('Base Currency'),
  targetCurrency: yup.string().required().label('Target Currency'),
});

export const AddFx = (props: AddFxProps) => {
  const location = useLocation();
  const urlParameters = decryptUrlParams(location.search) as Fx;
  const createFxMutation = useCreateFx();

  const formik = useFormik({
    initialValues: {
      rate: '',
      baseCurrency: '',
      targetCurrency: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      createFxMutation.mutate(
        { ...values, rate: Number(values.rate) },
        {
          onSuccess() {
            props.modalOptions.onClose();
            resetForm();
          },
        }
      );
    },
  });

  useEffect(() => {
    if (props.isEdit) {
      formik.setFieldValue('rate', urlParameters.rate);
      formik.setFieldValue('baseCurrency', urlParameters.baseCurrency);
      formik.setFieldValue('targetCurrency', urlParameters.targetCurrency);
    }
  }, [urlParameters.rate, urlParameters.baseCurrency, urlParameters.targetCurrency]);

  return (
    <Stack bgColor="white" rounded="16px">
      <Box pb={4}>
        <Text fontFamily="body" fontSize="lg" fontWeight="semibold">
          {props.isEdit ? 'Update FX Rate' : 'Add FX Rate'}
        </Text>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <FormSelect
            label="Base Currency"
            placeholder="Select base currency"
            {...getFormikFields(formik, 'baseCurrency')}
            options={currencyOptions}
          />
          <FormSelect
            label="Target Currency"
            placeholder="Select target currency"
            {...getFormikFields(formik, 'targetCurrency')}
            options={currencyOptions}
          />
          <FormInput label="Rate" placeholder="Enter rate" {...getFormikFields(formik, 'rate')} />
          <Flex justifyContent="center">
            <Button
              w="70%"
              type="submit"
              _hover={{ bgColor: 'primary.800' }}
              isLoading={createFxMutation.isPending}
            >
              {props.isEdit ? 'Update FX' : 'Add FX'}
            </Button>
          </Flex>
        </Stack>
      </form>
    </Stack>
  );
};

const currencyOptions = [
  {
    label: 'NGN',
    value: 'NGN',
  },
  { label: 'USD', value: 'USD' },
  { label: 'CAD', value: 'CAD' },
  { label: 'GBP', value: 'GBP' },
];
