import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Flex bgColor='white' ml={1}>
      <Text fontWeight='bold'>
        Reddit clone by{' '}
        <Link href='https://github.com/A1DS19'>
          <span style={{ color: 'blue', cursor: 'pointer' }}>Jose Padilla</span>
        </Link>{' '}
        {new Date().getFullYear()}
      </Text>
    </Flex>
  );
};
