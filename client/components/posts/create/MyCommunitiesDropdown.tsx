import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from '@chakra-ui/react';
import { AuthModalContext, AuthModalContextType } from 'context/auth/authModalContext';
import { CommunitiesContext } from 'context/communities/communitiesContext';
import { getJoinedCommunities } from 'context/communities/communitiesRequests';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdPeopleAlt } from 'react-icons/md';
import { CommunityResponse } from 'types/communities';

interface MyCommunitiesDropdownProps {
  selectedCommunity: CommunityResponse | null;
}

export const MyCommunitiesDropdown: React.FC<MyCommunitiesDropdownProps> = ({
  selectedCommunity,
}) => {
  const {
    loading,
    joinedCommunities,
    setSelectedCommunity,
    setLoading,
    setJoinedCommunities,
    setErrorMessage,
  } = React.useContext(CommunitiesContext) as CommunitiesContext;
  const { openSelectedModal } = React.useContext(
    AuthModalContext
  ) as AuthModalContextType;

  const fetchJoinedCommunities = async () => {
    try {
      setLoading(true);
      const data = await getJoinedCommunities();
      setJoinedCommunities(data);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    async () => {
      await fetchJoinedCommunities();
    };

    return () => {
      setErrorMessage(null);
    };
  }, []);

  const renderMyCommunities = () => {
    return (
      <React.Fragment>
        <MenuItem
          onClick={() => openSelectedModal('create_community')}
          icon={<AiOutlinePlus fontSize={25} />}
          fontSize='sm'
        >
          Create Community
        </MenuItem>
        {!loading ? (
          <Box maxH='60' overflowY='scroll'>
            {joinedCommunities.map((community) => (
              <Box
                onClick={() => setSelectedCommunity(community as CommunityResponse)}
                key={community.id}
              >
                <MenuItem
                  icon={
                    !!community.profile_pic_url ? (
                      <Image
                        src={community.profile_pic_url}
                        alt={`${community.name} profile picture`}
                      />
                    ) : (
                      <MdPeopleAlt size={25} />
                    )
                  }
                >
                  {community.name}
                </MenuItem>
              </Box>
            ))}
          </Box>
        ) : (
          <MenuItem>
            <Spinner />
          </MenuItem>
        )}
      </React.Fragment>
    );
  };
  return (
    <Menu>
      {({ isOpen }) => (
        <React.Fragment>
          <MenuButton
            overflow='hidden'
            width='30%'
            as={Button}
            rightIcon={
              isOpen ? <ChevronUpIcon fontSize={20} /> : <ChevronDownIcon fontSize={20} />
            }
            bgColor='white'
            fontSize='sm'
            fontWeight='black'
            _hover={{ border: '1px', borderColor: 'gray' }}
            _expanded={{ bgColor: 'white' }}
            borderRadius='md'
          >
            r/{selectedCommunity?.name}
          </MenuButton>
          <MenuList width='100%'>{renderMyCommunities()}</MenuList>
        </React.Fragment>
      )}
    </Menu>
  );
};
