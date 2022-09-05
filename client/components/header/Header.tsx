import { Box, Flex, Tooltip, Button as ButtonCh, Divider } from '@chakra-ui/react';
import { AuthContext, AuthContextType } from 'context/auth/authContext';
import { AuthModalContext, AuthModalContextType } from 'context/auth/authModalContext';
import { me } from 'context/auth/authRequests';
import Link from 'next/link';
import React from 'react';
import { AiOutlinePlus, AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs';
import { HiOutlineChartSquareBar } from 'react-icons/hi';
import { VscBell } from 'react-icons/vsc';
import { LoginModal } from '../auth/LoginModal';
import { SignUpModal } from '../auth/SignUpModal';
import { Button } from '../common/Button';
import { CreateCommunityModal } from '../communities/CreateCommunityModal';
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
      case 'create_community':
        return <CreateCommunityModal isOpen={isOpen} onClose={onClose} />;
      default:
        return null;
    }
  };

  const renderIsNotAuth = (): JSX.Element => {
    return (
      <React.Fragment>
        <Button inverted text='Log In' onClick={() => openSelectedModal('login')} />
        <Button text='Sign Up' onClick={() => openSelectedModal('signup')} />
      </React.Fragment>
    );
  };

  const renderIsAuth = (): JSX.Element => {
    return (
      <Box mx={3}>
        <IsAuthMenu />
      </Box>
    );
  };

  const renderCommunityDropdown = (): JSX.Element => {
    return (
      <Box mx={2}>
        <CommunityDropdown />
      </Box>
    );
  };

  const renderSideMenu = () => {
    return (
      <Flex alignItems='center' textAlign='center'>
        <Tooltip label='Popular'>
          <Box
            cursor='pointer'
            mx={1}
            padding={1}
            borderRadius='md'
            _hover={{ bgColor: 'blackAlpha.100' }}
            bgColor='white'
            alignSelf='center'
            textAlign='center'
          >
            <BsArrowUpRightCircle fontSize={22} />
          </Box>
        </Tooltip>

        <Tooltip label='All'>
          <Box
            cursor='pointer'
            mx={1}
            padding={1}
            borderRadius='md'
            _hover={{ bgColor: 'blackAlpha.100' }}
            bgColor='white'
            alignSelf='center'
            textAlign='center'
          >
            <HiOutlineChartSquareBar fontSize={22} />
          </Box>
        </Tooltip>

        <Tooltip label='Reddit Live'>
          <Box
            cursor='pointer'
            mx={1}
            padding={1}
            borderRadius='md'
            _hover={{ bgColor: 'blackAlpha.100' }}
            bgColor='white'
            alignSelf='center'
            textAlign='center'
          >
            <AiOutlineVideoCameraAdd fontSize={22} />
          </Box>
        </Tooltip>

        <Divider orientation='vertical' mx={1} />

        <Tooltip label='Chat'>
          <Box
            cursor='pointer'
            mx={1}
            padding={1}
            borderRadius='md'
            _hover={{ bgColor: 'blackAlpha.100' }}
            bgColor='white'
            alignSelf='center'
            textAlign='center'
          >
            <BsChatDots fontSize={22} />
          </Box>
        </Tooltip>

        <Tooltip label='Notifications'>
          <Box
            cursor='pointer'
            mx={1}
            padding={1}
            borderRadius='md'
            _hover={{ bgColor: 'blackAlpha.100' }}
            bgColor='white'
            alignSelf='center'
            textAlign='center'
          >
            <VscBell fontSize={22} />
          </Box>
        </Tooltip>

        <Link href={`/r/create`}>
          <Tooltip label='Create Post'>
            <Box
              cursor='pointer'
              mx={1}
              padding={1}
              borderRadius='md'
              _hover={{ bgColor: 'blackAlpha.100' }}
              bgColor='white'
              alignSelf='center'
              textAlign='center'
            >
              <AiOutlinePlus fontSize={22} />
            </Box>
          </Tooltip>
        </Link>
      </Flex>
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
        <Box>
          {isAuth ? (
            <Flex>
              {renderSideMenu()}
              {renderIsAuth()}
            </Flex>
          ) : (
            renderIsNotAuth()
          )}
        </Box>
      </Flex>
      {displayModal()}
    </React.Fragment>
  );
};
