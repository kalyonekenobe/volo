import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { configureCorsAllowedOriginsList } from './modules/app/utils/app.utils';
import * as cookieParser from 'cookie-parser';
import ValidationPipes from 'src/core/config/validation.pipes';
import { AllExceptionFilter } from 'src/core/filters/exception.filter';
import { configurePrismaDecimalJSONStringifyOutput } from 'src/core/utils/decimal.utils';
import { configurePrismaBigIntJSONStringifyOutput } from 'src/core/utils/bigint.utils';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(ValidationPipes.validationPipe);
  app.useGlobalFilters(new AllExceptionFilter(app.get(HttpAdapterHost)));

  app.enableCors({
    origin: configureCorsAllowedOriginsList(process.env.CORS_ALLOWED_ORIGINS || ''),
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, TRACE, CONNECT',
    credentials: true,
  });

  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');

  configurePrismaDecimalJSONStringifyOutput();
  configurePrismaBigIntJSONStringifyOutput();

  await app.listen(process.env.BACKEND_PORT || 8000);
};

bootstrap();
