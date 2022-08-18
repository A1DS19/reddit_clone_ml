import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import React from 'react';

interface AlertMessageProps {
  type: 'error' | 'info' | 'warning' | 'success' | 'loading' | undefined;
  message?: string;
  description: string;
  fontSize?: number | 'sm' | 'md' | 'lg';
  padding?: number;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  description,
  message,
  fontSize = 'sm',
  padding = 1.5,
}) => {
  return (
    <Alert mt={1} mb={2} status={type} rounded='md' p={padding} fontSize={fontSize}>
      <AlertIcon />
      <AlertTitle>{message}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
