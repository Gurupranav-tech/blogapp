import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
