import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AuthContext, AuthContextType } from 'context/auth/authContext';
import { AuthModalContext, AuthModalContextType } from 'context/auth/authModalContext';
import { CommunitiesContext } from 'context/communities/communitiesContext';
import { leaveJoinCommunity } from 'context/communities/communitiesRequests';
import Image from 'next/image';
import React from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import { BsBellSlash, BsFillBellFill } from 'react-icons/bs';
import { TbBellRinging } from 'react-icons/tb';
import { CommunityResponse } from 'types/communities';

interface HeaderProps {
  selectedCommunity: CommunityResponse;
  isFromList: boolean;
}

export const Header: React.FC<HeaderProps> = ({ selectedCommunity, isFromList }) => {
  const { user, isAuth } = React.useContext(AuthContext) as AuthContextType;
  const { setSelectedCommunity, loading, setLoading } = React.useContext(
    CommunitiesContext
  ) as CommunitiesContext;
  const { openSelectedModal } = React.useContext(
    AuthModalContext
  ) as AuthModalContextType;
  const isUserMember = selectedCommunity?.members?.find(
    (member) => member.id === user?.id
  );

  const leaveJoin = async () => {
    if (!isAuth) {
      openSelectedModal('login');
      return;
    }

    try {
      setLoading(true);
      const data = await leaveJoinCommunity(selectedCommunity?.id);
      const newData = { ...selectedCommunity, members: data };
      setSelectedCommunity(newData as any);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Box
        bgImage={selectedCommunity?.header_pic_url || ''}
        bgColor={!selectedCommunity?.header_pic_url ? 'gray.700' : ''}
        height={100}
      />
      <Box bgColor='white'>
        <Flex ml='16'>
          <Box mr={3} position='relative' top={-5}>
            <Image
              style={{
                borderRadius: '100%',
                border: '5px',
                borderColor: 'white',
                borderStyle: 'solid',
              }}
              src={
                selectedCommunity?.profile_pic_url ||
                'https://res.cloudinary.com/ai1ds/image/upload/v1661826022/redditpfp_kw0g4g.png'
              }
              height={80}
              width={80}
              alt={`${selectedCommunity?.name} profile picture`}
            />
          </Box>
          <Box alignSelf='center'>
            <Heading>{selectedCommunity?.name}</Heading>
            <Text fontSize='sm' color='gray' fontWeight='bold'>
              r/{selectedCommunity?.name}
            </Text>
          </Box>

          {isFromList && (
            <Stack ml={5} direction='row' alignItems='center'>
              <Button
                variant='outline'
                color='blue.500'
                borderRadius='full'
                borderColor='blue.500'
                _hover={{ bgColor: 'gray.300' }}
                onClick={leaveJoin}
                isLoading={loading}
              >
                {isUserMember ? 'Joined' : 'Join'}
              </Button>
              {isUserMember && (
                <Menu>
                  <MenuButton
                    as={Button}
                    borderColor='blue.500'
                    variant='outline'
                    rounded='full'
                    padding='0'
                  >
                    <BsFillBellFill
                      fontSize='20'
                      color='#3182ce'
                      style={{ marginLeft: 8 }}
                    />
                  </MenuButton>
                  <MenuList color='gray' fontWeight='bold' fontSize='sm'>
                    <MenuItem>
                      <TbBellRinging fontSize={25} />
                      <Text ml={1}>Frequent</Text>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>
                      <AiOutlineBell fontSize={25} />
                      <Text ml={1}>Low</Text>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>
                      <BsBellSlash fontSize={25} />
                      <Text ml={1}>Off</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          )}
        </Flex>
      </Box>
    </React.Fragment>
  );
};
