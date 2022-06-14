import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from 'src/controllers/comments.controller';
import { CommentsService } from 'src/services/comments.service';
import { PostsController } from 'src/controllers/posts.controller';
import { Comment } from 'src/entities/comment.entity';
import { Post } from 'src/entities/post.entity';
import { PostsService } from 'src/services/posts.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([Comment]),
    AuthModule,
  ],
  controllers: [PostsController, CommentsController],
  providers: [PostsService, CommentsService],
})
export class PostsModule {}
