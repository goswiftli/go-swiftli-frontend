import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import PaystackPop from '@paystack/inline-js';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useMakePayment } from '@/apis';
import { FormInput, FormSelect } from '@/components';
import { useAppSelector } from '@/redux';

const validationSchema = yup.object().shape({
  amount: yup
    .number()
    .positive('Amount must be a positive number')
    .min(100, 'Amount must be more than 100')
    .required()
    .label('Amount'),
  currencyCode: yup.string().required().label('Currency Code'),
  narration: yup.string().required().label('Narration'),
});

export const Payment = () => {
  const { authUser } = useAppSelector((state) => state.auth);

  const initializePayment = (accessCode: string) => {
    const popup = new PaystackPop();
    popup.resumeTransaction(accessCode);
  };

  const paymentMutation = useMakePayment();
  const formik = useFormik({
    initialValues: {
      amount: '',
      currencyCode: '',
      narration: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      paymentMutation.mutate(
        {
          ...values,
          amount: Number(values.amount) * 100,
          email: authUser.username,
        },
        {
          onSuccess(res) {
            initializePayment(res.data.accessCode);
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
                Payment
              </Text>
              <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
                <Stack w="full" spacing={12}>
                  <FormInput
                    label="Amount"
                    name="amount"
                    type="number"
                    placeholder="enter amount"
                    value={formik.values.amount}
                    isInvalid={formik.touched.amount && Boolean(formik.errors.amount)}
                    onChange={formik.handleChange}
                    errorMessage={formik.touched.amount && formik.errors.amount}
                  />

                  <FormSelect
                    options={currencyCodeOptions}
                    label="Currency Code"
                    name="currencyCode"
                    placeholder="select currency code"
                    value={formik.values.currencyCode}
                    isInvalid={formik.touched.currencyCode && Boolean(formik.errors.currencyCode)}
                    onChange={formik.handleChange}
                    errorMessage={formik.touched.currencyCode && formik.errors.currencyCode}
                  />
                  <FormInput
                    label="Narration"
                    name="narration"
                    placeholder="narration"
                    value={formik.values.narration}
                    isInvalid={formik.touched.narration && Boolean(formik.errors.narration)}
                    onChange={formik.handleChange}
                    errorMessage={formik.touched.narration && formik.errors.narration}
                  />

                  <Button isLoading={paymentMutation.isPending} type="submit">
                    Make Payment
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

const currencyCodeOptions = [
  { label: 'Naira', value: 'NGN' },
  { label: 'US dollar', value: 'USD' },
];
