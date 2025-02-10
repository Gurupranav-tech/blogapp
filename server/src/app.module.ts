import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path = require('path');

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    PostModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', './static'),
      exclude: ['api/*'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
