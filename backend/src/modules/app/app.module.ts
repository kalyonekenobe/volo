import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigVariables } from 'src/core/enums/app.enums';
import { PasswordModule } from 'src/modules/password/password.module';
import { PasswordModuleOptions } from 'src/modules/password/types/password.types';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { SupabaseModule } from 'src/modules/supabase/supabase.module';
import { SupabaseModuleOptions } from 'src/modules/supabase/types/supabase.types';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { StripeModule } from 'src/modules/stripe/stripe.module';
import { StripeModuleOptions } from 'src/modules/stripe/types/stripe.types';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: [],
      isGlobal: true,
    }),
    PassportModule.registerAsync({
      useFactory: async () => ({
        session: true,
      }),
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ConfigVariables.SupabaseJwtSecret),
        signOptions: {
          audience: configService.get<string>(ConfigVariables.JwtAudience),
          issuer: configService.get<string>(ConfigVariables.JwtIssuer),
          expiresIn: configService.get<string>(ConfigVariables.JwtAccessTokenDuration),
        },
      }),
      inject: [ConfigService],
    }),
    SupabaseModule.registerAsync({
      useFactory: async (configService: ConfigService): Promise<SupabaseModuleOptions> => ({
        supabaseUrl: configService.get<string>(ConfigVariables.SupabaseUrl) || '',
        supabaseKey: configService.get<string>(ConfigVariables.SupabaseKey) || '',
        supabaseBucketName: configService.get<string>(ConfigVariables.SupabaseBucketName) || '',
        supabaseJwtSecret: configService.get<string>(ConfigVariables.SupabaseJwtSecret) || '',
      }),
      inject: [ConfigService, JwtService],
    }),
    PasswordModule.registerAsync({
      useFactory: async (configService: ConfigService): Promise<PasswordModuleOptions> => ({
        saltPrefix: configService.get<string>(ConfigVariables.UserPasswordSaltPrefix) || '',
        saltSuffix: configService.get<string>(ConfigVariables.UserPasswordSaltSuffix) || '',
        saltRounds: configService.get<number>(ConfigVariables.UserPasswordSaltRounds) || 0,
      }),
      inject: [ConfigService],
    }),
    StripeModule.registerAsync({
      useFactory: async (configService: ConfigService): Promise<StripeModuleOptions> => ({
        stripeApiKey: configService.get<string>(ConfigVariables.StripeSecretKey) || '',
        options: { apiVersion: '2024-10-28.acacia' },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
