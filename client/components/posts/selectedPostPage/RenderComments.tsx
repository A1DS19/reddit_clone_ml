import { Box, Flex, Text } from '@chakra-ui/react';
import { formatDistance } from 'date-fns';
import React from 'react';
import { BsReddit } from 'react-icons/bs';
import { TbArrowBigDown, TbArrowBigTop } from 'react-icons/tb';
import { VscComment } from 'react-icons/vsc';
import { PostResponse } from 'types/posts';

interface RenderCommentsProps {
  post: PostResponse;
}

export const RenderComments: React.FC<RenderCommentsProps> = ({ post }) => {
  const renderComments = () => {
    return post?.comments?.map((comment) => (
      <Box p={2} borderRadius='md' my={2} key={comment?.id} bgColor='blackAlpha.50'>
        <Box>
          <Flex alignItems='center'>
            <Box mr={1}>
              <BsReddit fontSize={20} />
            </Box>
            <Text fontSize='sm'>
              {comment?.user?.username}
              {' - '}
              <span style={{ color: 'gray' }}>
                {formatDistance(new Date(comment?.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </Text>
          </Flex>
        </Box>

        <Box my={2}>
          <Text fontSize='sm'>{comment?.body}</Text>
        </Box>

        <Box>
          <Flex fontSize={20} fontWeight='bold'>
            <Flex>
              <TbArrowBigTop cursor='pointer' />
              <Text mx={1} fontSize='sm'>
                0
              </Text>
              <TbArrowBigDown cursor='pointer' />
            </Flex>

            <Flex ml={2} color='gray'>
              <Flex
                mx={1}
                _hover={{ bgColor: 'blackAlpha.100' }}
                borderRadius='md'
                alignItems='center'
                p={1}
              >
                <VscComment />
                <Text ml={1} fontSize='xs'>
                  Reply
                </Text>
              </Flex>

              <Flex
                padding={1.5}
                cursor='pointer'
                _hover={{ bgColor: 'blackAlpha.100' }}
                borderRadius='md'
                alignItems='center'
              >
                <Text fontSize='xs'>Give Award</Text>
              </Flex>

              <Flex
                padding={1.5}
                cursor='pointer'
                _hover={{ bgColor: 'blackAlpha.100' }}
                borderRadius='md'
                alignItems='center'
              >
                <Text fontSize='xs'>Share</Text>
              </Flex>

              <Flex
                padding={1.5}
                cursor='pointer'
                _hover={{ bgColor: 'blackAlpha.100' }}
                borderRadius='md'
                alignItems='center'
              >
                <Text fontSize='xs'>Report</Text>
              </Flex>

              <Flex
                padding={1.5}
                cursor='pointer'
                _hover={{ bgColor: 'blackAlpha.100' }}
                borderRadius='md'
                alignItems='center'
              >
                <Text fontSize='xs'>Save</Text>
              </Flex>

              <Flex
                padding={1.5}
                cursor='pointer'
                _hover={{ bgColor: 'blackAlpha.100' }}
                borderRadius='md'
                alignItems='center'
              >
                <Text fontSize='xs'>Follow</Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
    ));
  };

  return (
    <React.Fragment>
      {post.comments.length > 0 && (
        <Box p={3} borderRadius='md' bgColor='white' maxH={200} overflowY='scroll'>
          {renderComments()}
        </Box>
      )}
    </React.Fragment>
  );
};
