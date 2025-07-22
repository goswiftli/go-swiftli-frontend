import { Box, Button, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ReactComponent as NigeriaIcon } from '@/assets/icons/nigeria-flag.svg';
import { ReactComponent as USIcon } from '@/assets/icons/united-states.svg';
import { FormInput } from '@/components';
import { formatCurrency } from '@/utils';

const validationSchema = yup.object().shape({
  withdraw: yup.string().email().required().label('Withdrawal Input'),
  accountNumber: yup.string().required().label('Account Number'),
});

export const Withdraw = () => {
  const formik = useFormik({
    initialValues: {
      withdraw: '',
      accountNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
                Withdraw
              </Text>
              <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
                <Stack w="full" spacing={12}>
                  <Box w="full">
                    <Box pb={1}>
                      <FormInput
                        label="Withdraw from"
                        name="withdraw"
                        placeholder="$"
                        rightElement={<Icon as={NigeriaIcon} boxSize={6} />}
                        value={formik.values.withdraw}
                        isInvalid={formik.touched.withdraw && Boolean(formik.errors.withdraw)}
                        onChange={formik.handleChange}
                        errorMessage={formik.touched.withdraw && formik.errors.withdraw}
                      />
                    </Box>

                    <HStack
                      bgColor="primary.50"
                      borderRadius="4px"
                      p={2}
                      justifyContent="space-between"
                    >
                      <Text fontFamily="body" fontWeight="light" fontSize="md">
                        NGN Balance
                      </Text>
                      <Text fontFamily="inter" fontWeight="medium" fontSize="md">
                        {formatCurrency(0, 'NGN', 'en-NG')}
                      </Text>
                    </HStack>
                  </Box>
                  <Box w="full">
                    <Box pb={1}>
                      <FormInput
                        label="To"
                        name="accountNumber"
                        placeholder="Account Number"
                        rightElement={<Icon as={USIcon} boxSize={6} />}
                        value={formik.values.accountNumber}
                        isInvalid={
                          formik.touched.accountNumber && Boolean(formik.errors.accountNumber)
                        }
                        onChange={formik.handleChange}
                        errorMessage={formik.touched.accountNumber && formik.errors.accountNumber}
                      />
                    </Box>

                    <HStack
                      bgColor="primary.50"
                      borderRadius="4px"
                      p={2}
                      justifyContent="space-between"
                    >
                      <Text fontFamily="body" fontWeight="light" fontSize="md">
                        USD Balance
                      </Text>
                      <Text fontFamily="inter" fontWeight="medium" fontSize="md">
                        {formatCurrency(0, 'USD', 'en-US')}
                      </Text>
                    </HStack>
                  </Box>

                  <Text
                    textAlign="center"
                    fontFamily="body"
                    fontWeight="light"
                    fontSize="md"
                  >{`1USD = 1600NGN`}</Text>

                  <Button type="submit">Withdraw</Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </section>
  );
};
