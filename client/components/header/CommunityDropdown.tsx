import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Box,
  Button,
  Text,
  Input,
  Spinner,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { MdPeopleAlt } from 'react-icons/md';
import {
  AiOutlineHome,
  AiOutlineOrderedList,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineVideoCameraAdd,
} from 'react-icons/ai';
import { BsArrowUpRightCircle, BsCoin, BsShieldPlus } from 'react-icons/bs';
import { HiOutlineChartSquareBar } from 'react-icons/hi';
import { VscBell } from 'react-icons/vsc';
import { TbShirt } from 'react-icons/tb';
import { GrEmptyCircle } from 'react-icons/gr';
import { GiCrystalBall } from 'react-icons/gi';
import { CommunitiesContext } from 'context/communities/communitiesContext';
import Link from 'next/link';
import Image from 'next/image';
import { AuthModalContext, AuthModalContextType } from 'context/auth/authModalContext';
import { debounce } from 'lodash';
import {
  getAllCommunities,
  getCommunityBySlug,
  getJoinedCommunities,
  getJoinedCommunitiesFilter,
} from 'context/communities/communitiesRequests';
import { AuthContext, AuthContextType } from 'context/auth/authContext';

interface CommunityDropdownProps {}

export const CommunityDropdown: React.FC<CommunityDropdownProps> = ({}) => {
  const {
    joinedCommunities,
    setJoinedCommunities,
    loading,
    selectedCommunity,
    setLoading,
    setErrorMessage,
    setSelectedCommunity,
    allCommunities,
    setAllCommunities,
  } = React.useContext(CommunitiesContext) as CommunitiesContext;
  const { openSelectedModal } = React.useContext(
    AuthModalContext
  ) as AuthModalContextType;
  const { user } = React.useContext(AuthContext) as AuthContextType;
  const [inputValue, setInputValue] = React.useState<string>('');
  const router = useRouter();

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

  const fetchAllCommunities = async () => {
    try {
      setLoading(true);
      const data = await getAllCommunities();

      if (joinedCommunities.length === 0) {
        setAllCommunities(data);
        return;
      }

      const filteredData = data.filter((community) => {
        return !joinedCommunities.some((community2) => {
          return community.id == community2.id;
        });
      });

      setAllCommunities(filteredData);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSelectedCommunity = async () => {
    const selectedCommunity = localStorage.getItem('selectedCommunity')
      ? JSON.parse(localStorage.getItem('selectedCommunity') || '')
      : '';
    if (selectedCommunity !== '') {
      try {
        const data = await getCommunityBySlug(
          selectedCommunity?.slug,
          user?.id.toString()!
        );
        setSelectedCommunity(data);
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  React.useEffect(() => {
    (async () => {
      await fetchJoinedCommunities();
    })();

    return () => {
      setErrorMessage(null);
    };
  }, []);

  React.useEffect(() => {
    (async () => {
      await fetchAllCommunities();
    })();
  }, [joinedCommunities]);

  React.useEffect(() => {
    (async () => {
      await fetchSelectedCommunity();
    })();
  }, [selectedCommunity?.name]);

  React.useEffect(() => {
    (async () => {
      if (inputValue === '') {
        await fetchJoinedCommunities();
      }
    })();

    return () => {
      setErrorMessage(null);
    };
  }, [inputValue]);

  const filterCommunity = async (inputValue: string) => {
    try {
      const data = await getJoinedCommunitiesFilter(inputValue);
      setJoinedCommunities(data);
    } catch (error: any) {}
  };

  const debounceFilter = React.useCallback(debounce(filterCommunity, 500), []);

  const handleFilterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    debounceFilter(e.target.value);
  };

  const renderSelectedCommunity = () => {
    const communityName = router.pathname === '/' ? 'Home' : selectedCommunity?.name;
    return (
      <Flex alignItems='center'>
        <Box mr={0.5}>
          <MdPeopleAlt size={25} />
        </Box>
        {communityName}
      </Flex>
    );
  };

  const renderFilter = () => {
    return (
      <React.Fragment>
        <Input
          placeholder='Filter Community'
          size='sm'
          width='90%'
          ml={3}
          onChange={async (e) => await handleFilterChange(e)}
          value={inputValue}
        />
      </React.Fragment>
    );
  };

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
              <Link
                key={community.id}
                href={`/r/${community.slug}?userId=${user?.id}`}
                passHref
              >
                <a target='_self'>
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
                </a>
              </Link>
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

  const renderRandomCommunities = () => {
    return (
      <React.Fragment>
        {!loading ? (
          <Box maxH='60' overflowY='scroll'>
            {allCommunities.map((community) => (
              <Link
                key={community.id}
                href={`/r/${community.slug}?userId=${user?.id}`}
                passHref
              >
                <a target='_self'>
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
                </a>
              </Link>
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

  const renderFeeds = () => {
    return (
      <React.Fragment>
        <Link href='/'>
          <MenuItem icon={<AiOutlineHome fontSize={25} />} fontSize='sm'>
            Home
          </MenuItem>
        </Link>
        <MenuItem icon={<BsArrowUpRightCircle fontSize={25} />} fontSize='sm'>
          Popular
        </MenuItem>
        <MenuItem icon={<HiOutlineChartSquareBar fontSize={25} />} fontSize='sm'>
          All
        </MenuItem>
        <MenuItem icon={<AiOutlineVideoCameraAdd fontSize={25} />} fontSize='sm'>
          Reddit Live
        </MenuItem>
      </React.Fragment>
    );
  };

  const renderOther = () => {
    return (
      <React.Fragment>
        <MenuItem icon={<AiOutlineUser fontSize={25} />} fontSize='sm'>
          User Settings
        </MenuItem>
        <MenuItem icon={<AiOutlineUser fontSize={25} />} fontSize='sm'>
          Messages
        </MenuItem>
        <MenuItem icon={<AiOutlinePlus fontSize={25} />} fontSize='sm'>
          Create Post
        </MenuItem>
        <MenuItem icon={<AiOutlineOrderedList fontSize={25} />} fontSize='sm'>
          Top Communities
        </MenuItem>
        <MenuItem icon={<VscBell fontSize={25} />} fontSize='sm'>
          Notifications
        </MenuItem>
        <MenuItem icon={<BsCoin fontSize={25} />} fontSize='sm'>
          Coins
        </MenuItem>
        <MenuItem icon={<BsShieldPlus fontSize={25} />} fontSize='sm'>
          Premium
        </MenuItem>
        <MenuItem icon={<TbShirt fontSize={25} />} fontSize='sm'>
          Avatar
        </MenuItem>
        <MenuItem icon={<GrEmptyCircle fontSize={25} />} fontSize='sm'>
          Talk
        </MenuItem>
        <MenuItem icon={<GiCrystalBall fontSize={25} />} fontSize='sm'>
          Predictions
        </MenuItem>
      </React.Fragment>
    );
  };

  return (
    <Menu>
      {({ isOpen }) => (
        <React.Fragment>
          <MenuButton
            overflow='hidden'
            width='100%'
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
            {renderSelectedCommunity()}
          </MenuButton>
          <MenuList maxHeight='482px' overflowX='hidden' overflowY='scroll' width='270px'>
            <Box>{renderFilter()}</Box>
            <Text my={3} color='gray' ml={4} fontSize={10} fontWeight={500}>
              YOUR COMMUNITIES
            </Text>
            {renderMyCommunities()}
            <Text my={3} color='gray' ml={4} fontSize={10} fontWeight={500}>
              COMMUNITIES YOU MIGTH LIKE
            </Text>
            {renderRandomCommunities()}
            <Text my={3} color='gray' ml={4} fontSize={10} fontWeight={500}>
              FEEDS
            </Text>
            {renderFeeds()}
            <Text my={3} color='gray' ml={4} fontSize={10} fontWeight={500}>
              OTHER
            </Text>
            {renderOther()}
          </MenuList>
        </React.Fragment>
      )}
    </Menu>
  );
};
