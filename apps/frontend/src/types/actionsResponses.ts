export interface LoginActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof LoginFormData]?: string[];
  };
}
interface LoginFormData {
  username: string;
  password: string;
}

export interface SignUpActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof SignUpFormData]?: string[];
  };
}
interface SignUpFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
