import {
  MenuButton,
  Menu as ChakraMenu,
  MenuList,
  MenuItem,
  Button,
  SystemCSSProperties,
  MenuDivider,
  PlacementWithLogical,
} from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';

import { convertUnderscoreToSpace } from '@/utils';

type MenuProps = {
  menuItems: {
    label: string;
    value: string | number;
  }[];
  handleClick?: (item: string, name: string) => void;
  placement?: PlacementWithLogical;
  selectedMenuItem?: string;
  closeOnSelect?: boolean;
  isLoading?: boolean;
  styles?: SystemCSSProperties;
  menuTitle?: string;
};

export const Menu = ({
  menuItems,
  handleClick,
  placement,
  selectedMenuItem,
  closeOnSelect,
  isLoading = false,
  styles,
  menuTitle,
}: MenuProps) => {
  const handleSelectItem = (item: string, name: string) => {
    handleClick?.(item, name);
  };

  return (
    <ChakraMenu matchWidth placement={placement ?? 'auto'} closeOnSelect={closeOnSelect}>
      <MenuButton
        variant="unstyled"
        as={Button}
        bgColor="grey.100"
        w="100%"
        display="flex"
        p="0 1em"
        textAlign="start"
        fontSize="sm"
        h="40px"
        fontWeight="medium"
        fontFamily="body"
        border="1px solid"
        borderRadius="64px"
        borderColor="grey.300"
        sx={styles}
        rightIcon={<BsChevronDown color="grey.400" />}
        isLoading={isLoading}
      >
        {convertUnderscoreToSpace(selectedMenuItem) || `Filter by ${menuTitle}`}
      </MenuButton>

      <MenuList w="full" maxHeight="200px" overflowY="auto" fontSize="sm" px={2}>
        <MenuDivider />
        {menuItems.map((item, index) => (
          <MenuItem
            _hover={{ bgColor: 'grey.50' }}
            fontFamily="body"
            fontSize="sm"
            fontWeight="medium"
            key={`${item}-${index}`}
            onClick={() => {
              handleSelectItem(item.value.toString(), item.label);
            }}
          >
            {convertUnderscoreToSpace(item.label)}
          </MenuItem>
        ))}
      </MenuList>
    </ChakraMenu>
  );
};
