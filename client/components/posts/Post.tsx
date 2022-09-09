import {
  Box,
  Flex,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  MenuDivider,
} from '@chakra-ui/react';
import { TbArrowBigDown, TbArrowBigTop } from 'react-icons/tb';
import { VscComment } from 'react-icons/vsc';
import { BsArrow90DegRight, BsGift, BsBookmark, BsFlag } from 'react-icons/bs';
import { AiOutlineCheck, AiOutlineEyeInvisible } from 'react-icons/ai';

import NextImage from 'next/image';
import React from 'react';
import testImage from '../../public/reddit_512x512.png';
import { PostResponse } from 'types/posts';
import { AuthContext, AuthContextType } from 'context/auth/authContext';
import {
  getPostById,
  getVoteCountForPostId,
  updatePostVoteForPostId,
} from 'context/posts/postsRequests';
import { formatDistance } from 'date-fns';
import { IPostsContext, PostsContext } from 'context/posts/postsContext';
import { AuthModalContext, AuthModalContextType } from 'context/auth/authModalContext';
import { VoteType } from 'types/votes.d';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { CommunitiesContext } from 'context/communities/communitiesContext';
import { useRouter } from 'next/router';

interface PostProps {
  post: PostResponse;
  isFromList: boolean;
}

export const Post: React.FC<PostProps> = ({ post, isFromList }) => {
  const [voteCount, setVoteCount] = React.useState(0);
  const { setPosts } = React.useContext(PostsContext) as IPostsContext;
  const { user, isAuth } = React.useContext(AuthContext) as AuthContextType;
  const { loading, setLoading, setSelectedCommunity, selectedCommunity } =
    React.useContext(CommunitiesContext) as CommunitiesContext;
  const { openSelectedModal } = React.useContext(
    AuthModalContext
  ) as AuthModalContextType;
  const isUserMember = selectedCommunity?.members?.find(
    (member) => member.id === user?.id
  );
  const userVote = post?.votes[0];
  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      try {
        const voteCount = await getVoteCountForPostId(post.id);
        setVoteCount(voteCount);
      } catch (err) {}
    })();
  }, [post?.id]);

  const updatePostVote = async (value: number) => {
    if (!isAuth) {
      openSelectedModal('login');
      return;
    }

    try {
      await updatePostVoteForPostId(post.id, value);
      const voteCount = await getVoteCountForPostId(post.id);
      setVoteCount(voteCount);
      const data = await getPostById(post.id);
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === data.id) {
            return data;
          }
          return post;
        })
      );
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  const renderLikes = (): JSX.Element => {
    return (
      <Flex
        flexDirection={'column'}
        bgColor='whiteAlpha.800'
        alignItems='center'
        maxW='40px'
        padding={3}
      >
        <Box
          onClick={async () => await updatePostVote(VoteType.UPVOTE)}
          cursor='pointer'
          _hover={{ color: 'orange', bgColor: 'blackAlpha.100', borderRadius: 'sm' }}
        >
          <TbArrowBigTop
            color={userVote && userVote.vote_type == VoteType.UPVOTE ? 'orange' : ''}
            fontSize={25}
          />
        </Box>
        <Text fontSize='sm' fontWeight='black'>
          {voteCount || 0}
        </Text>
        <Box
          onClick={async () => await updatePostVote(VoteType.DOWNVOTE)}
          cursor='pointer'
          _hover={{ color: 'blue.500', bgColor: 'blackAlpha.100', borderRadius: 'sm' }}
        >
          <TbArrowBigDown
            color={userVote && userVote.vote_type == VoteType.DOWNVOTE ? '#3182ce' : ''}
            fontSize={25}
          />
        </Box>
      </Flex>
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <Box bgColor='white' padding={2} w='full'>
        <Flex alignItems={'center'}>
          <NextImage src={testImage} width={20} height={20} alt='comunity image' />
          <Text
            onClick={
              isFromList
                ? () => router.push(`/r/${post.community?.slug}?userId=${user?.id || -1}`)
                : () => {}
            }
            cursor={isFromList ? 'pointer' : 'default'}
            mx={2}
            fontWeight='black'
          >
            r/{post?.community?.name}
          </Text>
          <Text fontSize='xs' fontWeight='light'>
            {`Posted by: u/${post?.user.username} ${formatDistance(
              new Date(post?.createdAt),
              new Date(),
              { addSuffix: true }
            )}`}
          </Text>
        </Flex>

        <Box mx={2} mt={2}>
          <Heading mb={1} fontSize={21}>
            {post?.title}
          </Heading>
          <Text> {post?.body} </Text>

          {post?.imagesUrl && (
            <Carousel
              showArrows={true}
              autoPlay
              showIndicators
              showStatus
              showThumbs
              infiniteLoop
              interval={4000}
            >
              {post?.imagesUrl.map((image) => (
                <Box key={image}>
                  <Image src={image} alt='image' width={400} height={400} />
                </Box>
              ))}
            </Carousel>
          )}
        </Box>

        <Box px={1} mt={2} mb={1}>
          {renderBottomHeader()}
        </Box>
      </Box>
    );
  };

  const renderBottomHeader = (): JSX.Element => {
    return (
      <Box>
        <Flex fontSize='xl' fontWeight='bold' color='gray'>
          <Flex
            onClick={
              isFromList
                ? () =>
                    router.push(
                      `/r/${post?.community?.slug}/${post?.slug}?userId=${user?.id || -1}`
                    )
                : () => {}
            }
            mx={1}
            cursor={isFromList ? 'pointer' : 'default'}
            _hover={{ bgColor: 'blackAlpha.100' }}
            borderRadius='md'
            alignItems='center'
          >
            <VscComment />
            <Text ml={1.5} fontSize='xs'>
              {post?.commentCount} Comments
            </Text>
          </Flex>

          <Flex
            mx={1}
            padding={1.5}
            cursor='pointer'
            _hover={{ bgColor: 'blackAlpha.100' }}
            borderRadius='md'
            alignItems='center'
          >
            <BsGift />
            <Text ml={1.5} fontSize='xs'>
              Award
            </Text>
          </Flex>

          <Flex
            mx={1}
            padding={1.5}
            cursor='pointer'
            _hover={{ bgColor: 'blackAlpha.100' }}
            borderRadius='md'
            alignItems='center'
          >
            <BsArrow90DegRight />
            <Text ml={1.5} fontSize='xs'>
              Share
            </Text>
          </Flex>

          <Menu isLazy>
            <MenuButton
              mx={1}
              borderRadius='md'
              py={0.2}
              px={3}
              _hover={{ bgColor: 'blackAlpha.100' }}
              fontSize='lg'
            >
              ...
            </MenuButton>
            <MenuList>
              <MenuItem icon={<AiOutlineCheck fontSize={20} />} fontSize={'sm'}>
                Show More Posts Like This
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<AiOutlineEyeInvisible fontSize={20} />} fontSize={'sm'}>
                Show Fewer Posts Like This
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<BsBookmark fontSize={20} />} fontSize={'sm'}>
                Save
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<AiOutlineEyeInvisible fontSize={20} />} fontSize={'sm'}>
                Hide
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<BsFlag fontSize={20} />} fontSize={'sm'}>
                Report
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    );
  };
  return (
    <React.Fragment>
      <Box mb={4} border='GrayText' borderColor={'gray'} borderRadius='md'>
        <Flex>
          {isFromList && renderLikes()}
          {renderContent()}
        </Flex>
      </Box>
    </React.Fragment>
  );
};
