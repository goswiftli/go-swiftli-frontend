import { Box, Button, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { ReactComponent as BankIcon } from '@/assets/icons/bank-transfer.svg';
import { ReactComponent as CardIcon } from '@/assets/icons/card-transfer.svg';
import { CONSTANTS } from '@/constants';
import { useToast } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/redux';
import { saveDataToSessStorage } from '@/utils';

import { BeneficiaryDTO, PaymentType } from '../../types';
import { setBeneficiaryInformation } from '../../userFlowSlice';

type PaymentMethodProps = {
  handleNext: () => void;
};

export const PaymentMethod = ({ handleNext }: PaymentMethodProps) => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { beneficiaryInformation } = useAppSelector((state) => state.userFlow);

  const [selectedItem, setIsSelectedItem] = useState('');

  useEffect(() => {
    if (beneficiaryInformation.paymentMethod) {
      setIsSelectedItem(beneficiaryInformation.paymentMethod);
    }
  }, []);

  const handleClick = (paymentType: PaymentType) => {
    setIsSelectedItem(paymentType);
    saveDataToSessStorage<BeneficiaryDTO>('beneficiary-info', { paymentMethod: paymentType });
    dispatch(
      setBeneficiaryInformation({
        paymentMethod: paymentType,
      })
    );
  };

  const handleNextStep = () => {
    if (!beneficiaryInformation.paymentMethod) {
      toast({
        status: 'error',
        id: 'pay-toast',
        description: 'A payment type must be selected',
        duration: 3000,
      });
    } else {
      handleNext();
    }
  };
  return (
    <Box minH="70vh">
      <Stack spacing={5} direction={{ base: 'column', md: 'row' }} justifyContent="center" pt={12}>
        {paymentItems.map((item) => (
          <Box
            w={{ base: 'full', md: '70%', lg: '50%', xl: '30%' }}
            bgColor="blue.200"
            border={selectedItem === item.value ? '1px solid' : 'none'}
            borderColor={selectedItem === item.value ? 'primary.800' : 'transparent'}
            py={10}
            rounded="8px"
            as="button"
            key={item.name}
            onClick={() => handleClick(item.value as PaymentType)}
            _hover={{ borderColor: 'primary.800', border: '1px solid' }}
          >
            <Stack spacing={4} justifyContent="center" alignItems="center">
              <Icon boxSize="4em" as={item.icon} />
              <Text fontFamily="body" fontSize="lg" fontWeight="bold">
                {item.name}
              </Text>
              <Text textAlign="center" w="80%" fontFamily="body" fontSize="md">
                {item.description}
              </Text>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Flex w="full" justifyContent="end" pt={10}>
        <HStack w={{ base: '50%', lg: '30%' }} justifyContent="flex-end">
          <Button rounded="6px" w="full" onClick={handleNextStep}>
            Next
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

const paymentItems = [
  {
    name: 'Bank Transfer',
    value: CONSTANTS.BANK_TRANSFER,
    description: 'You will receive account details to transfer funds manually',
    icon: BankIcon,
  },
  {
    name: 'Credit/Debit Card',
    value: CONSTANTS.CARD_PAYMENT,
    description: 'Secure online payment with your card.',
    icon: CardIcon,
  },
];
