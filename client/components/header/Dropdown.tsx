import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface DropdownProps {}

export const Dropdown: React.FC<DropdownProps> = ({}) => {
  return (
    <Menu>
      <MenuButton
        px={6}
        py={2}
        borderRadius='md'
        borderWidth='1px'
        _focus={{ boxShadow: 'outline' }}
      >
        Communities <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        <MenuItem>New File</MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuDivider />
        <MenuItem>Open...</MenuItem>
        <MenuItem>Save File</MenuItem>
      </MenuList>
    </Menu>
  );
};
