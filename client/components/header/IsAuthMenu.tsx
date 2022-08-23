import { Icon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import { AuthContext, AuthContextType } from 'context/auth/authContext';
import React from 'react';

interface IsAuthMenuProps {}

export const IsAuthMenu: React.FC<IsAuthMenuProps> = ({}) => {
  const { user, logoutUser } = React.useContext(AuthContext) as AuthContextType;

  const CircleIcon = (props: any): JSX.Element => (
    <Icon viewBox='0 0 200 200' {...props}>
      <path
        fill='currentColor'
        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
      />
    </Icon>
  );

  return (
    <Menu size={'xs'}>
      {({ isOpen }) => (
        <React.Fragment>
          <MenuButton
            as={Button}
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          >
            <CircleIcon color='green.500' fontSize='xs' /> {user?.username}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logoutUser}>Log Out</MenuItem>
          </MenuList>
        </React.Fragment>
      )}
    </Menu>
  );
};
