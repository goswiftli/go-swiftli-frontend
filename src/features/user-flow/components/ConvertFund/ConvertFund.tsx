import { Box, Button, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { ReactComponent as NigeriaIcon } from '@/assets/icons/nigeria-flag.svg';
import { ReactComponent as USIcon } from '@/assets/icons/united-states.svg';
import { FormInput } from '@/components';
import { formatCurrency } from '@/utils';

const validationSchema = yup.object().shape({
  amountToConvert: yup.string().email().required().label('Amount to convert'),
  convertedAmount: yup.string().required().label('Converted amount'),
});

export const ConvertFund = () => {
  const formik = useFormik({
    initialValues: {
      amountToConvert: '',
      convertedAmount: '',
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
                Convert Fund
              </Text>
              <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
                <Stack w="full" spacing={12}>
                  <Box w="full">
                    <Box pb={1}>
                      <FormInput
                        label="Amount to convert"
                        name="amountToConvert"
                        placeholder="$"
                        rightElement={<Icon as={NigeriaIcon} boxSize={6} />}
                        value={formik.values.amountToConvert}
                        isInvalid={
                          formik.touched.amountToConvert && Boolean(formik.errors.amountToConvert)
                        }
                        onChange={formik.handleChange}
                        errorMessage={
                          formik.touched.amountToConvert && formik.errors.amountToConvert
                        }
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
                        label="You'll get"
                        name="convertedAmount"
                        rightElement={<Icon as={USIcon} boxSize={6} />}
                        value={formik.values.convertedAmount}
                        isInvalid={
                          formik.touched.convertedAmount && Boolean(formik.errors.convertedAmount)
                        }
                        onChange={formik.handleChange}
                        errorMessage={
                          formik.touched.convertedAmount && formik.errors.convertedAmount
                        }
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

                  <Button type="submit">Convert Funds</Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </section>
  );
};
