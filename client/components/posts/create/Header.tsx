import { Flex, Heading, Button, Tag, Divider } from '@chakra-ui/react';
import React from 'react';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <React.Fragment>
      <Flex pt={9} pb={3} justifyContent='space-between'>
        <Heading fontWeight='semibold' fontSize='lg'>
          Create a post
        </Heading>
        <Flex>
          <Button
            _hover={{ bgColor: 'blackAlpha.200' }}
            mr={3}
            color='blue.500'
            size='sm'
            variant='ghost'
            borderRadius='full'
          >
            COLLECTIONS
            <Tag ml={1} bgColor='blackAlpha.300' color='white'>
              0
            </Tag>
          </Button>
          <Button
            _hover={{ bgColor: 'blackAlpha.200' }}
            color='blue.500'
            size='sm'
            variant='ghost'
            borderRadius='full'
          >
            DRAFTS
            <Tag ml={1} bgColor='blackAlpha.300' color='white'>
              0
            </Tag>
          </Button>
        </Flex>
      </Flex>
      <Divider orientation='horizontal' color='whatsapp.100' pb={2} />
    </React.Fragment>
  );
};
