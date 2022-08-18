export type open_close_modal_type = {
  onClose: () => void;
  isOpen: boolean;
};

export type modal_type = 'login' | 'signup' | 'reset_password' | 'reset_username' | null;
