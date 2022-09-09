import { Box, Flex, Input, Stack } from '@chakra-ui/react';
import { AuthContext, AuthContextType } from 'context/auth/authContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import { BsLink45Deg } from 'react-icons/bs';
import { CommunityResponse } from 'types/communities';

interface CreatePostSubheaderProps {
  selectedCommunity: CommunityResponse | null;
}

export const CreatePostSubheader: React.FC<CreatePostSubheaderProps> = ({
  selectedCommunity,
}) => {
  const router = useRouter();
  const { user } = React.useContext(AuthContext) as AuthContextType;

  return (
    <Flex borderRadius='md' bgColor='white' alignItems='center' padding={1}>
      <Link href={`/user/${user?.username}`}>
        <Box cursor='pointer'>
          <Image
            style={{ borderRadius: '100%' }}
            src={
              selectedCommunity?.profile_pic_url ||
              'https://res.cloudinary.com/ai1ds/image/upload/v1661826022/redditpfp_kw0g4g.png'
            }
            alt={`${selectedCommunity?.name || 'home'} picture`}
            width={60}
            height={60}
          />
        </Box>
      </Link>
      <Input
        placeholder='Create Post'
        bgColor='blackAlpha.100'
        onClick={() => router.push(`/r/${selectedCommunity?.name || 'home'}/submit`)}
      />
      <Stack direction='row' fontSize={25} color='gray' mx={3}>
        <Link href={`/r/${selectedCommunity?.slug || 'home'}/submit?media=true`}>
          <Box cursor='pointer'>
            <AiOutlinePicture />
          </Box>
        </Link>

        <Link href={`/r/${selectedCommunity?.slug || 'home'}/submit?url`}>
          <Box cursor='pointer'>
            <BsLink45Deg />
          </Box>
        </Link>
      </Stack>
    </Flex>
  );
};
