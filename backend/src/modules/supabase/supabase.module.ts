import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ServerException } from 'src/core/exceptions/server.exception';
import { SupabaseService } from 'src/modules/supabase/supabase.service';
import {
  SupabaseModuleAsyncOptions,
  SupabaseModuleOptions,
} from 'src/modules/supabase/types/supabase.types';

@Global()
@Module({})
export class SupabaseModule {
  static register(options: SupabaseModuleOptions): DynamicModule {
    return {
      module: SupabaseModule,
      providers: [
        {
          provide: SupabaseService,
          useFactory: async (configService: ConfigService, jwtService: JwtService) =>
            new SupabaseService(options, configService, jwtService),
          inject: [ConfigService, JwtService],
        },
      ],
      exports: [SupabaseService],
    };
  }

  static registerAsync(options: SupabaseModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);

    return {
      module: SupabaseModule,
      imports: [JwtModule],
      providers: [...asyncProviders, ...(options.extraProviders || [])],
      exports: [SupabaseService],
      global: options.global || false,
    };
  }

  private static createAsyncProviders(options: SupabaseModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [
        {
          provide: SupabaseService,
          useFactory: async (
            configService: ConfigService,
            jwtService: JwtService,
            ...args: any[]
          ): Promise<SupabaseService> => {
            const config = (await options.useFactory?.(configService, jwtService, ...args)) || {
              supabaseKey: '',
              supabaseUrl: '',
              supabaseBucketName: '',
              supabaseJwtSecret: '',
            };

            return new SupabaseService(config, configService, jwtService);
          },
          inject: options.inject || [ConfigService, JwtService],
        },
      ];
    }

    if (options.useClass) {
      return [
        {
          provide: SupabaseService,
          useClass: options.useClass,
        },
      ];
    }

    if (options.useExisting) {
      return [
        {
          provide: SupabaseService,
          useExisting: options.useExisting,
        },
      ];
    }

    throw new ServerException('Invalid async options for supabase module were provided');
  }
}
