import { Box, Flex } from '@chakra-ui/react';
import { AuthModalContext, AuthModalContextType } from 'context/authModalContext';
import React from 'react';
import { LoginModal } from '../auth/LoginModal';
import { SignUpModal } from '../auth/SignUpModal';
import { Button } from '../common/Button';
import { Dropdown } from './Dropdown';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { openModal, openSelectedModal, isOpen, onClose } = React.useContext(
    AuthModalContext
  ) as AuthModalContextType;

  const displayModal = (): JSX.Element | null => {
    switch (openModal) {
      case 'login':
        return <LoginModal isOpen={isOpen} onClose={onClose} />;
      case 'signup':
        return <SignUpModal isOpen={isOpen} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <Flex
        py={1}
        bgColor='white'
        alignItems='center'
        minWidth='max-content'
        justifyContent='space-between'
      >
        <Box ml={4}>
          <Logo />
        </Box>
        {/* <Box>
        <Dropdown />
      </Box> */}
        <Box width='60%'>
          <SearchBar />
        </Box>
        <Box>
          <Button inverted text='Log In' onClick={() => openSelectedModal('login')} />
          <Button text='Sign Up' onClick={() => openSelectedModal('signup')} />
        </Box>
      </Flex>
      {displayModal()}
    </React.Fragment>
  );
};
