import { Provider, Type } from '@nestjs/common';

export interface PasswordModuleOptions {
  saltPrefix: string;
  saltSuffix: string;
  saltRounds: number;
}

export interface PasswordOptionsFactory {
  createPasswordOptions(): Promise<PasswordModuleOptions> | PasswordModuleOptions;
}

export interface PasswordModuleAsyncOptions {
  global?: boolean;
  useExisting?: Type<PasswordOptionsFactory>;
  useClass?: Type<PasswordOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<PasswordModuleOptions> | PasswordModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}
