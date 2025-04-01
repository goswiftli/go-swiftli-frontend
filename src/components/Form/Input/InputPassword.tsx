import {
  FormControl,
  type FormControlProps,
  FormLabel,
  FormErrorMessage,
  Input,
  type InputProps,
  InputGroup,
  InputRightElement,
  Icon,
} from '@chakra-ui/react';
import { ReactNode, useState } from 'react';

import { IoMdEyeOff, IoMdEye } from 'react-icons/io';

export type FormInputPasswordProps = InputProps & {
  label?: ReactNode;
  errorMessage?: string | boolean | string[];
  name: string;
  formControlProps?: FormControlProps;
};

export function FormInputPassword({
  label,
  errorMessage,
  formControlProps,
  ...rest
}: FormInputPasswordProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl {...formControlProps} isInvalid={!!errorMessage}>
      {label && (
        <FormLabel fontWeight="medium" fontSize="lg" fontFamily="body">
          {label}
        </FormLabel>
      )}
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          {...rest}
          bgColor="neutral.200"
          px={4}
          py={3}
          _placeholder={{
            color: 'black.200',
            fontSize: 'sm',
            fontFamily: 'body',
            fontWeight: 'normal',
          }}
        />
        <InputRightElement h="full" width="3.5rem">
          <Icon
            boxSize="24px"
            color="black.300"
            onClick={handleClick}
            _hover={{ cursor: 'pointer' }}
            as={show ? IoMdEyeOff : IoMdEye}
          />
        </InputRightElement>
      </InputGroup>

      <FormErrorMessage mt="2px" fontSize={'xs'} fontFamily="body">
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
}
