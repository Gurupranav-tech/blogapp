import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/Prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async posts() {
    const posts = await this.prisma.post.findMany({
      select: {
        content: true,
        id: true,
        genres: true,
        title: true,
        Likes: true,
        user: true,
      }
    });
    return posts;
  }
}
