import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/dto/comments/create-comment.dto';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async deleteComment(id: string): Promise<void> {
    const result = await this.commentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
  }
  async getCommentsByPostId(postId: Post): Promise<Comment[]> {
    const result = await this.commentsRepository.find({
      where: { post: postId },
    });
    if (!result) {
      throw new NotFoundException(`Comment with ID "${postId}" not found`);
    }
    return result;
  }
  async createComment(
    createCommentDto: CreateCommentDto,
    author: User,
  ): Promise<Comment> {
    const { content, dateTime, postId } = createCommentDto;
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    try {
      const comment = this.commentsRepository.create({
        content,
        dateTime,
        post,
        author,
      });
      await this.commentsRepository.save(comment);
      return comment;
    } catch (error) {
      if (error.code === '23503')
        throw new NotFoundException(`Post with ID ${post} not found`);
      else throw new InternalServerErrorException();
    }
  }

  async getCommentById(id: string): Promise<Comment> {
    const result = await this.commentsRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
    return result;
  }
  async getCommentByIdAndDoStuff(id: string): Promise<Comment> {
    const result = await this.commentsRepository.findOne({ where: { id: id } });
    result.content = result.content + 'stuff';
    // Added new comment just to trigger review
    result.post = null;
    if (!result) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
    return result;
  }
}
