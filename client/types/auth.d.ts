export type open_close_modal_type = {
  onClose: () => void;
  isOpen: boolean;
};

export type modal_type =
  | 'login'
  | 'signup'
  | 'reset_password'
  | 'reset_username'
  | 'create_community'
  | null;

export interface LoginWithUsernameValues {
  username: string;
  password: string;
}

export interface SignUpValues {
  email: '';
  username: '';
  password: '';
  repeatPassword: '';
}

export interface UserResponse {
  id: number;
  username: string;
  isActive: boolean;
  session_expiration_time: Date;
}
