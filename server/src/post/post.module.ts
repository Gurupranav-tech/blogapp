import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from 'src/db/Prisma.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService]
})
export class PostModule {}
