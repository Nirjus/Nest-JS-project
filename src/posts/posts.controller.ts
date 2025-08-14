import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post as PostMethod,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post } from './interfaces/post.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  findAll(@Query('search') search?: string): Post[] {
    const extractAllPosts = this.postService.findAll();
    if (search) {
      return extractAllPosts.filter((post) =>
        post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      );
    }
    return extractAllPosts;
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ): Post {
    return this.postService.findOne(id);
  }

  @PostMethod()
  @HttpCode(HttpStatus.CREATED)
  createPost(
    @Body()
    postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>,
  ): Post {
    return this.postService.createPost(postData);
  }

  @Put(':id')
  updatePost(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updatedPostData: Partial<Omit<Post, 'id' | 'createdAt'>>,
  ): Post {
    return this.postService.updatePost(id, updatedPostData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePost(
    @Param('id', ParseIntPipe)
    id: number,
  ): string {
    return this.postService.remove(id);
  }
}
