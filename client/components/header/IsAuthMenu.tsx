import { Icon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
  Switch,
} from '@chakra-ui/react';
import { AuthContext, AuthContextType } from 'context/auth/authContext';
import React from 'react';
import {
  AiOutlineEye,
  AiOutlinePlusCircle,
  AiOutlineQuestionCircle,
} from 'react-icons/ai';
import { BsCoin, BsMegaphone, BsShieldPlus } from 'react-icons/bs';
import { CgLogIn } from 'react-icons/cg';
import { GrEmptyCircle } from 'react-icons/gr';
import { HiOutlineUserCircle } from 'react-icons/hi';

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

  const renderMyStuff = () => {
    return (
      <React.Fragment>
        <MenuItem
          closeOnSelect={false}
          disabled
          icon={<HiOutlineUserCircle color='gray' fontSize={25} />}
          fontSize='sm'
          color='gray'
          _hover={{ bgColor: 'white' }}
        >
          My Stuff
        </MenuItem>
        <MenuItem closeOnSelect={false} justifyContent='space-between' fontSize='sm'>
          Online Status <Switch size='md' />
        </MenuItem>
        <MenuItem fontSize='sm'>Profile</MenuItem>
        <MenuItem fontSize='sm'>Create Avatar</MenuItem>
        <MenuItem fontSize='sm'>User Settings</MenuItem>
      </React.Fragment>
    );
  };

  const renderViewOptions = () => {
    return (
      <React.Fragment>
        <MenuItem
          closeOnSelect={false}
          disabled
          icon={<AiOutlineEye color='gray' fontSize={25} />}
          fontSize='sm'
          color='gray'
          _hover={{ bgColor: 'white' }}
        >
          View Options
        </MenuItem>
        <MenuItem closeOnSelect={false} justifyContent='space-between' fontSize='sm'>
          Dark Mode <Switch size='md' />
        </MenuItem>
      </React.Fragment>
    );
  };

  const renderMSC = () => {
    return (
      <React.Fragment>
        <MenuItem icon={<AiOutlinePlusCircle fontSize={25} />} fontSize='sm'>
          Create a Community
        </MenuItem>
        <MenuItem icon={<BsMegaphone fontSize={25} />} fontSize='sm'>
          Advertise on Reddit
        </MenuItem>
        <MenuItem icon={<BsCoin fontSize={25} />} fontSize='sm'>
          Coins
        </MenuItem>
        <MenuItem icon={<BsShieldPlus fontSize={25} />} fontSize='sm'>
          Premium
        </MenuItem>
        <MenuItem icon={<GrEmptyCircle fontSize={25} />} fontSize='sm'>
          Talk
        </MenuItem>
        <MenuItem icon={<AiOutlineQuestionCircle fontSize={25} />} fontSize='sm'>
          About
        </MenuItem>
      </React.Fragment>
    );
  };

  const renderLogOut = () => {
    return (
      <MenuItem icon={<CgLogIn size={25} />} fontSize='sm' onClick={logoutUser}>
        Log Out
      </MenuItem>
    );
  };

  return (
    <Menu size={'xs'}>
      {({ isOpen }) => (
        <React.Fragment>
          <MenuButton
            bgColor='white'
            fontSize='sm'
            fontWeight='black'
            _hover={{ border: '1px', borderColor: 'gray' }}
            _expanded={{ bgColor: 'white' }}
            borderRadius='md'
            as={Button}
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          >
            <CircleIcon color='green.500' fontSize='xs' /> {user?.username}
          </MenuButton>
          <MenuList maxHeight='482px' overflowX='hidden' overflowY='scroll' width='270px'>
            {renderMyStuff()}
            <MenuDivider />
            {renderViewOptions()}
            <MenuDivider />
            {renderMSC()}
            <MenuDivider />
            {renderLogOut()}
          </MenuList>
        </React.Fragment>
      )}
    </Menu>
  );
};
