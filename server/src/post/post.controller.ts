import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Headers,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('/api/post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/posts')
  async posts() {
    return await this.postService.posts();
  }

  @Get('/posts/:skip')
  async paginatedPost(@Param('id') id: number) {
    return await this.postService.paginatedPost(id);
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  async createPost(@Headers('user') user: any, @Body() body: unknown) {
    return await this.postService.createPost(body, user);
  }

  @UseGuards(AuthGuard)
  @Post('/update/:id')
  async updatePost(
    @Headers('user') user: any,
    @Body() body: unknown,
    @Param('id') id: string,
  ) {
    return await this.postService.updatePost(body, user, id);
  }

  @UseGuards(AuthGuard)
  @Get('/delete/:id')
  async deletePost(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }
}
