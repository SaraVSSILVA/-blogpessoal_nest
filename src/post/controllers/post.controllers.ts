import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Post,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { Post as PostEntity } from '../entities/post.entity';

@Controller('/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postService.findById(id);
  }

  @Get('/title/:title')
  @HttpCode(HttpStatus.OK)
  findByAllTitle(@Param('title') title: string): Promise<PostEntity[]> {
    return this.postService.findAllByTitle(title);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.create(post);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.update(post);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
