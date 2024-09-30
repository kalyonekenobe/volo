import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ServerException } from 'src/core/exceptions/server.exception';
import { PasswordService } from 'src/modules/password/password.service';
import {
  PasswordModuleAsyncOptions,
  PasswordModuleOptions,
} from 'src/modules/password/types/password.types';

@Global()
@Module({})
export class PasswordModule {
  static register(options: PasswordModuleOptions): DynamicModule {
    return {
      module: PasswordModule,
      providers: [
        {
          provide: PasswordService,
          useValue: new PasswordService(options),
        },
      ],
      exports: [PasswordService],
    };
  }

  static registerAsync(options: PasswordModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: PasswordModule,
      providers: [...asyncProviders, ...(options.extraProviders || [])],
      exports: [PasswordService],
      global: options.global || false,
    };
  }

  private static createAsyncProviders(options: PasswordModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: PasswordService,
          useFactory: async (...args: any[]): Promise<PasswordService> => {
            const config = await options.useFactory?.(...args);

            return new PasswordService(config || { saltPrefix: '', saltSuffix: '', saltRounds: 0 });
          },
          inject: options.inject || [],
        },
      ];
    }

    if (options.useClass) {
      return [
        {
          provide: PasswordService,
          useClass: options.useClass,
        },
      ];
    }

    if (options.useExisting) {
      return [
        {
          provide: PasswordService,
          useExisting: options.useExisting,
        },
      ];
    }

    throw new ServerException('Invalid async options for password module were provided');
  }
}
