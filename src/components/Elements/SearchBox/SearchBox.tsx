import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

type SearchBoxProps = {
  placeholder: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  debounceValue?: number;
};

export const SearchBox = ({
  placeholder,
  inputValue,
  setInputValue,
  name,
  debounceValue = 500,
}: SearchBoxProps) => {
  const [localValue, setLocalValue] = useState(inputValue);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setInputValue(value);
    }, debounceValue),
    [debounceValue, setInputValue]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLocalValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    setLocalValue(inputValue);
  }, [inputValue]);
  return (
    <InputGroup>
      <Input
        rounded="64px"
        placeholder={placeholder}
        name={name}
        _placeholder={{ color: 'black.400', fontSize: 'xs', pl: 4 }}
        w="full"
        size="sm"
        bgColor="primary.50"
        value={localValue}
        onChange={(e) => handleChange(e)}
        borderColor="primary.800"
      />
      <InputLeftElement h="full">
        <Icon as={CiSearch} boxSize="24px" color="black.500" />
      </InputLeftElement>
    </InputGroup>
  );
};
