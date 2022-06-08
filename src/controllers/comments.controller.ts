import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { CreateCommentDto } from 'src/dto/comments/create-comment.dto';
import { Comment } from 'src/entities/comment.entity';
import { CommentsService } from 'src/services/comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService){}
    
    @Get('/:id')
    getPostById(@Param('id') id: string): Promise<Comment> {
      return this.commentsService.getCommentById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    createPost(@Body() createPostDto:CreateCommentDto) : Promise<Comment> {
      return this.commentsService.createComment(createPostDto);
    }

    @Delete('/:id')
    deletePost(@Param('id') id: string): Promise<void> {
      return this.commentsService.deleteComment(id);
    }
}
