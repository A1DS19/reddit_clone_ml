import React from 'react';
import { Input } from '@chakra-ui/react';

interface SearchBarProps {}

export const SearchBar: React.FC<SearchBarProps> = ({}) => {
  return (
    <Input
      backgroundColor='gray.50'
      border='1px'
      p={2}
      rounded='md'
      placeholder='Search Reddit'
      _hover={{ borderColor: 'blue.500' }}
    />
  );
};
