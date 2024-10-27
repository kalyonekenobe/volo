export interface User {
  firstName: string;
  lastName: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
}

export interface UserRoleDto {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRegistrationMethodDto {
  id: number;
  name: string;
  permissions: bigint;
  createdAt: Date;
  updatedAt: Date;
}


export enum UserRegistrationMethods {
  Credentials = 'credentials',
  Google = 'google',
  Discord = 'discord',
}

export enum UserRoles {
  User = 'user',
  Admin = 'Admin',
}