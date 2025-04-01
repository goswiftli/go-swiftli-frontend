import {
  FormControl,
  type FormControlProps,
  FormLabel,
  FormErrorMessage,
  Textarea,
  type TextareaProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export type FormTextareaProps = TextareaProps & {
  label?: ReactNode;
  errorMessage?: string | boolean;
  name: string;
  formControlProps?: FormControlProps;
};

export function FormTextarea({
  label,
  errorMessage,
  formControlProps,
  ...rest
}: FormTextareaProps) {
  return (
    <FormControl {...formControlProps} isInvalid={!!errorMessage}>
      {label && (
        <FormLabel fontWeight="medium" fontSize="lg" fontFamily="body">
          {label}
        </FormLabel>
      )}
      <Textarea
        {...rest}
        px={4}
        py={3}
        bgColor="white"
        borderColor="#858080A8"
        _placeholder={{
          color: 'black.200',
          fontSize: 'sm',
          fontFamily: 'body',
          fontWeight: 'normal',
        }}
      />
      <FormErrorMessage mt="2px" fontSize={'xs'}>
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
}
