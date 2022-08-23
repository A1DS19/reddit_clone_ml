import { Box, Flex } from '@chakra-ui/react';
import { AuthContext, AuthContextType } from 'context/auth/authContext';
import { AuthModalContext, AuthModalContextType } from 'context/auth/authModalContext';
import { me } from 'context/auth/authRequests';
import React from 'react';
import { LoginModal } from '../auth/LoginModal';
import { SignUpModal } from '../auth/SignUpModal';
import { Button } from '../common/Button';
import { CommunityDropdown } from './CommunityDropdown';
import { IsAuthMenu } from './IsAuthMenu';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const { isAuth, setUser } = React.useContext(AuthContext) as AuthContextType;
  const { openModal, openSelectedModal, isOpen, onClose } = React.useContext(
    AuthModalContext
  ) as AuthModalContextType;

  React.useEffect(() => {
    (async () => {
      try {
        const data = await me();
        setUser(data);
      } catch (error) {}
    })();
  }, [setUser]);

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

  const renderIsAuth = (): JSX.Element => {
    return (
      <React.Fragment>
        <Button inverted text='Log In' onClick={() => openSelectedModal('login')} />
        <Button text='Sign Up' onClick={() => openSelectedModal('signup')} />
      </React.Fragment>
    );
  };

  const renderIsNotAuth = (): JSX.Element => {
    return (
      <Box mx={3}>
        <IsAuthMenu />
      </Box>
    );
  };

  const renderCommunityDropdown = (): JSX.Element => {
    return (
      <Box>
        <CommunityDropdown />
      </Box>
    );
  };

  return (
    <React.Fragment>
      <Flex
        py={1}
        bgColor='white'
        alignItems='center'
        minWidth='max-content'
        justifyContent='space-between'
        paddingY={2}
      >
        <Box ml={4}>
          <Logo />
        </Box>
        {isAuth && renderCommunityDropdown()}
        <Box width='60%'>
          <SearchBar />
        </Box>
        <Box>{!isAuth ? renderIsAuth() : renderIsNotAuth()}</Box>
      </Flex>
      {displayModal()}
    </React.Fragment>
  );
};
