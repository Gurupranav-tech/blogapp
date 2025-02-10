import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('/api/post')
export class PostController {
  constructor(private postService: PostService) {}


  @Get('/posts')
  async posts() {
    return await this.postService.posts();
  }
}
