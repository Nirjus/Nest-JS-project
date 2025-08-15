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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistsPipe } from './pipes/post-exists.pipe';

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
    @Param('id', ParseIntPipe, PostExistsPipe)
    id: number,
  ): Post {
    return this.postService.findOne(id);
  }

  @PostMethod()
  @HttpCode(HttpStatus.CREATED)
  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // )
  createPost(
    @Body()
    postData: CreatePostDto,
  ): Post {
    return this.postService.createPost(postData);
  }

  @Put(':id')
  updatePost(
    @Param('id', ParseIntPipe, PostExistsPipe)
    id: number,
    @Body()
    updatedPostData: UpdatePostDto,
  ): Post {
    return this.postService.updatePost(id, updatedPostData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePost(
    @Param('id', ParseIntPipe, PostExistsPipe)
    id: number,
  ): string {
    return this.postService.remove(id);
  }
}
