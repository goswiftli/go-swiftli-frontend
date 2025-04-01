import {
  FormControl,
  type FormControlProps,
  FormLabel,
  FormErrorMessage,
  Select,
  type SelectProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

export type FormSelectProps = SelectProps & {
  label?: ReactNode;
  errorMessage?: string | boolean;
  helperText?: string;
  name: string;
  options: {
    label: ReactNode;
    value: string | number;
  }[];
  formControlProps?: FormControlProps;
  defaultValue?: string | number;
};

export function FormSelect({
  label,
  errorMessage,
  formControlProps,
  options,
  ...rest
}: FormSelectProps) {
  return (
    <FormControl {...formControlProps} isInvalid={!!errorMessage}>
      {label && (
        <FormLabel fontWeight="medium" fontSize="lg" fontFamily="body">
          {label}
        </FormLabel>
      )}
      <Select
        {...rest}
        data-testid={rest.name}
        _placeholder={{
          color: 'black.200',
          fontSize: 'sm',
          fontFamily: 'body',
          fontWeight: 'normal',
        }}
      >
        {options?.map((option, index) => (
          <option key={`${index}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage mt="2px" fontSize={'xs'} fontFamily="body" fontWeight="normal">
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
}
