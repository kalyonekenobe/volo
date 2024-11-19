export interface LoginFormDto {
  email: string;
  password: string;
}

export interface RegistrationFormDto {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  password: string;
  userRoleId?: number;
  userRegistrationMethodId?: number;
}

export interface OAuthResponseDto {
  url: string;
}