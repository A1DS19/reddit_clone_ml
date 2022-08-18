import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Link,
  ModalFooter,
} from '@chakra-ui/react';
import React from 'react';
import { open_close_modal_type } from 'types/auth';

interface CostumAuthModalProps extends open_close_modal_type {
  title: string;
}

export const CostumAuthModal: React.FC<
  { children?: React.ReactNode } & CostumAuthModalProps
> = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal
      size='3xl'
      closeOnOverlayClick={false}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader paddingTop={10} paddingBottom={5} fontWeight='light'>
          <Text pt={5} pb={1}>
            {title}
          </Text>
          <Text fontWeight='thin' fontSize='sm'>
            By continuing, you agree to our{' '}
            <Link href='#' color='blue.500'>
              User Agreement
            </Link>{' '}
            and{' '}
            <Link href='#' color='blue.500'>
              Privacy Policy
            </Link>
            .
          </Text>
        </ModalHeader>
        <ModalCloseButton fontSize='md' />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
