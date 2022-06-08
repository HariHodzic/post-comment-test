import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from 'src/dto/posts/create-post.dto';
import { UpdatePostDto } from 'src/dto/posts/update-post.dto';
import { PostsService } from 'src/services/posts.service';
import { Post as PostEntity } from '../entities/post.entity';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService){}

    @Get('/:id')
    getPostById(@Param('id') id: string): Promise<PostEntity> {
      return this.postsService.getPostById(id);
    }

    @Post()
    createPost(@Body() createPostDto:CreatePostDto) : Promise<PostEntity> {
      return this.postsService.createPost(createPostDto);
    }

    @Delete('/:id')
    deletePost(@Param('id') id: string): Promise<void> {
      return this.postsService.deletePost(id);
    }

    @Patch('/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    updatePost(@Param('id') id: string,@Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
      return this.postsService.updatePost(id,updatePostDto);
    }

}
