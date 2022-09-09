import NonSSRWrapper from '@/components/common/NonSSRWrapper';
import { CreatePostTab } from '@/components/posts/create/CreatePostTab';
import { Header } from '@/components/posts/create/Header';
import { MyCommunitiesDropdown } from '@/components/posts/create/MyCommunitiesDropdown';
import { Box } from '@chakra-ui/react';
import { CommunitiesContext } from 'context/communities/communitiesContext';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Create: NextPage = () => {
  const { selectedCommunity } = React.useContext(
    CommunitiesContext
  ) as CommunitiesContext;
  const router = useRouter();

  React.useEffect(() => {
    if (selectedCommunity) {
      router.query.community = selectedCommunity?.slug;
      router.push(router);
    }
  }, [selectedCommunity]);

  return (
    <Box mx={4}>
      <Box>
        <NonSSRWrapper>
          <Header />
        </NonSSRWrapper>
      </Box>
      <Box mt={4} mb={2}>
        <NonSSRWrapper>
          <MyCommunitiesDropdown selectedCommunity={selectedCommunity} />
        </NonSSRWrapper>
      </Box>
      <Box>
        <NonSSRWrapper>
          <CreatePostTab />
        </NonSSRWrapper>
      </Box>
    </Box>
  );
};

export default Create;
