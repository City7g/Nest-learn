import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express'
import * as dotenv from 'dotenv'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { CustomValidationPipe } from './custom-validation-pipe'
// import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  )

  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Italian API')
    .setDescription('Test italian api')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  app.enableCors()

  app.useGlobalPipes(new CustomValidationPipe())
  // app.useGlobalPipes(new ValidationPipe())

  app.setViewEngine('pug')

  await app.listen(4000)
}

bootstrap()
