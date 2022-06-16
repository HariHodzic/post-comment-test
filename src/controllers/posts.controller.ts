import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from 'src/dto/posts/create-post.dto';
import { UpdatePostDto } from 'src/dto/posts/update-post.dto';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/helpers/decorators/get-user.decorator';
import { PostsService } from 'src/services/posts.service';
import { Post as PostEntity } from '../entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/myposts')
  @UseGuards(AuthGuard())
  getUsersPosts(@GetUser() author: User): Promise<PostEntity[]> {
    return this.postsService.getUsersPosts(author);
  }

  @Get('/:id')
  getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.getPostById(id);
  }

  @Get()
  getAllPosts(): Promise<PostEntity[]> {
    return this.postsService.getAllPosts();
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ transform: true }))
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() author: User,
  ): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto, author);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ transform: true }))
  updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.updatePost(id, updatePostDto);
  }
}
