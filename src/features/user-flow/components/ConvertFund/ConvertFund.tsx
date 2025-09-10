import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { FormInput, FormSelect } from '@/components';
import { getFormikFields } from '@/utils';

import { useConvertFund } from '../../apis';

const validationSchema = yup.object().shape({
  amount: yup
    .number()
    .positive('Amount must be a positive number')
    .min(100, 'Amount must be more than 100')
    .required()
    .label('Amount'),
  baseCurrency: yup.string().required().label('Base Currency'),
  targetCurrency: yup.string().required().label('Target Currency'),
});

export const ConvertFund = () => {
  const navigate = useNavigate();
  const convertFundMutation = useConvertFund();

  const formik = useFormik({
    initialValues: {
      amount: '',
      baseCurrency: '',
      targetCurrency: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      convertFundMutation.mutate(
        { ...values, amount: Number(values.amount) },
        {
          onSuccess() {
            resetForm();
            navigate(-1);
          },
        }
      );
    },
  });

  return (
    <section>
      <Box minH="100vh">
        <Flex justifyContent="center" overflowX="hidden">
          <Box
            bgColor="white"
            p={6}
            rounded="16px"
            w={{ base: 'full', md: '70%', lg: '60%', xl: '50%' }}
          >
            <Stack alignItems="center" px={{ md: 4, lg: 10, xl: 12 }}>
              <Text fontFamily="body" fontSize={{ base: '2xl', lg: '4xl' }}>
                Convert Fund
              </Text>
              <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
                <Stack w="full" spacing={8}>
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
                  <FormInput
                    label="Amount"
                    placeholder="Enter Amount"
                    {...getFormikFields(formik, 'amount')}
                  />

                  <Text
                    textAlign="center"
                    fontFamily="body"
                    fontWeight="light"
                    fontSize="md"
                  >{`1USD = 1600NGN`}</Text>

                  <Button
                    type="submit"
                    _hover={{ bgColor: 'primary.800' }}
                    isLoading={convertFundMutation.isPending}
                  >
                    Convert Funds
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </section>
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
