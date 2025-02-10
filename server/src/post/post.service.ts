import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/Prisma.service';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

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
      },
      orderBy: [{ createdAt: 'asc' }, { id: 'desc' }],
    });
    return posts;
  }

  async paginatedPost(skip: number) {
    const posts = await this.prisma.post.findMany({
      select: {
        content: true,
        id: true,
        genres: true,
        title: true,
        Likes: true,
        user: true,
      },
      skip,
      take: 10,
    });
    return posts;
  }

  async createPost(body: unknown, user: any) {
    const userid = user.id;
    try {
      const postData = await PostSchema.parseAsync(body);
      const post = await this.prisma.post.create({
        data: {
          title: postData.title,
          userid,
          content: postData.content,
          genres: '',
        },
        select: {
          title: true,
          content: true,
          genres: true,
          user: true,
        },
      });
      return post;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePost(body: unknown, user: any, id: string) {
    const userid = user.id;
    try {
      const postData = await PostSchema.parseAsync(body);
      const post = await this.prisma.post.update({
        data: {
          title: postData.title,
          userid,
          content: postData.content,
          genres: '',
        },
        select: {
          title: true,
          content: true,
          genres: true,
          user: true,
        },
        where: {
          id,
        },
      });
      return post;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async deletePost(id: string) {
    await this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
