import { Box, Text } from '@chakra-ui/react';
import React from 'react';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box bgColor='white'>
      <Box paddingY={3} ml={1}>
        <Text fontWeight='bold'>
          Reddit clone by Jose Padilla {new Date().getFullYear()}
        </Text>
      </Box>
    </Box>
  );
};
