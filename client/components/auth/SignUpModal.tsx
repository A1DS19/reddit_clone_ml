import React from 'react';
import { open_close_modal_type } from 'types/auth';
import { CostumAuthModal } from './CostumAuthModal';
import { SignUpForm } from './SignupForm';

interface SignUpModalProps extends open_close_modal_type {}

export const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  return (
    <CostumAuthModal title='Sign Up' isOpen={isOpen} onClose={onClose}>
      <SignUpForm />
    </CostumAuthModal>
  );
};
