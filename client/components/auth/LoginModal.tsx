import React from 'react';
import { open_close_modal_type } from 'types/auth';
import { CostumAuthModal } from './CostumAuthModal';
import { LoginForm } from './LoginForm';

interface LoginModalProps extends open_close_modal_type {}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <CostumAuthModal title='Log in' isOpen={isOpen} onClose={onClose}>
      <LoginForm />
    </CostumAuthModal>
  );
};
