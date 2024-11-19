import { Post } from './post.types';

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  birthDate: Date | null;
  phone: string | null;
  bio: string | null;
  image: string | null;
  userRegistrationMethodId: number;
  userRoleId: number;
  stripeCustomerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  userRegistrationMethod?: UserRegistrationMethod;
  userRole?: UserRole;
  posts?: Post[];
}

export interface UserRegistrationMethod {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  users?: User[];
}

export interface UserRole {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  users?: User[];
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
  User = 'User',
  Admin = 'Admin',
}