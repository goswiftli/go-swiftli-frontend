import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';

type SearchBoxProps = {
  placeholder: string;
};

export const SearchBox = ({ placeholder }: SearchBoxProps) => {
  return (
    <InputGroup>
      <Input
        rounded="64px"
        placeholder={placeholder}
        _placeholder={{ color: 'black.400', fontSize: 'xs', pl: 4 }}
        w="full"
        size="sm"
        bgColor="primary.50"
        borderColor="primary.800"
      />
      <InputLeftElement h="full">
        <Icon as={CiSearch} boxSize="24px" color="black.500" />
      </InputLeftElement>
    </InputGroup>
  );
};
