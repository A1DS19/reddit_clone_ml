import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Box,
  Button,
  MenuDivider,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { MdPeopleAlt } from 'react-icons/md';

interface CommunityDropdownProps {}

export const CommunityDropdown: React.FC<CommunityDropdownProps> = ({}) => {
  const router = useRouter();
  console.log(router.pathname);

  return (
    <Menu>
      {({ isOpen }) => (
        <React.Fragment>
          <MenuButton
            as={Button}
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          >
            <Flex alignItems='center'>
              <Box mr={0.5}>
                <MdPeopleAlt size={19} />
              </Box>
              Communities
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem>Selected Community</MenuItem>
            <MenuDivider />
            <MenuItem>Community XXX</MenuItem>
            <MenuItem>Community XXX</MenuItem>
            <MenuItem>Community XXX</MenuItem>
          </MenuList>
        </React.Fragment>
      )}
    </Menu>
  );
};
