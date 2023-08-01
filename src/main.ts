import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: ['error', 'warn', 'debug', 'verbose'], // 'log' // remove log to disable logging
    });
  app.setGlobalPrefix('api');
  // app config service
  const configService = app.get(ConfigService);
  app.enableShutdownHooks();

  // api version
  const apiVersion: string = configService.get<string>('API_VERSION');
  const swaggerPath = 'swagger';

  /// enable CORS (ALLOW REQUEST FROM ALL POINTS IN TIME)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  /*
   * ###########################################################
   * ##################### SWAGGER CONFIG ######################
   * ###########################################################
   * */
  const config: Omit<OpenAPIObject, any> = new DocumentBuilder()
    .setTitle(`EV DATA COLLECTION API version ${apiVersion}`)
    .setDescription(
      'This is the backend api for the ev project data collection',
    )
    .setVersion(`${apiVersion}`)
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  // path for swagger
  SwaggerModule.setup(`${swaggerPath}`, app, document);

  // get the port from the config file
  const port = configService.get<number>('PORT');

  await app
    .listen(port)
    .then((): void => {
      /// USEFUL LINKS TO THE VARIOUS ENDPOINTS.
      console.log(`Front end running on port http://localhost:${port}/api`);
      console.log(
        `Swagger running on port http://localhost:${port}/${swaggerPath}`,
      ); // THE SWAGGER PAGE ROUTE
      console.log('Press CTRL-C to stop server'); // KILL THE SERVER AND END THE APPLICATION
    })
    .catch((err): void => {
      console.log('There was an error starting server. ', err);
    });
}

bootstrap().then(() => {
  console.log();
});
