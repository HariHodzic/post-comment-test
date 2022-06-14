import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from 'src/dto/comments/create-comment.dto';
import { Comment } from 'src/entities/comment.entity';
import { Post as PostEntity } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/helpers/decorators/get-user.decorator';
import { CommentsService } from 'src/services/comments.service';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get()
  getCommentsFromPost(@Query() postId: PostEntity): Promise<Comment[]> {
    const result = this.commentsService.getCommentsByPostId(postId);
    return result;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createComment(
    @Body() createPostDto: CreateCommentDto,
    @GetUser() author: User,
  ): Promise<Comment> {
    return this.commentsService.createComment(createPostDto, author);
  }

  @Delete('/:id')
  deleteComment(@Param('id') id: string): Promise<void> {
    return this.commentsService.deleteComment(id);
  }
}
