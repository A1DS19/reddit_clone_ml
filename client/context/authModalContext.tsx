import { useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { modal_type } from 'types/auth';
import { ReactFCWithChildren } from 'types/shared';

export interface AuthModalContextType {
  openModal: modal_type;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  openSelectedModal: (type: modal_type) => void;
}

export const AuthModalContext = React.createContext<AuthModalContextType | false>(false);

export const AuthModalProvider: ReactFCWithChildren = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openModal, setOpenModal] = React.useState<modal_type>(null);

  const openSelectedModal = (type: modal_type): void => {
    onOpen();
    setOpenModal(type);
  };

  const value: AuthModalContextType = {
    openModal,
    openSelectedModal,
    isOpen,
    onOpen,
    onClose,
  };

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
};
