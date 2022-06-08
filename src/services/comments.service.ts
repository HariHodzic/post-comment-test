import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/dto/comments/create-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>,
    ){}
    
    async deleteComment(id: string): Promise<void> {
        const result = await this.commentsRepository.delete(id);    
        if (result.affected === 0) {
            throw new NotFoundException(`Comment with ID "${id}" not found`);
        }
    }

    async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        const {content, dateTime}  = createCommentDto;
        const comment = this.commentsRepository.create({
            content,
            dateTime,
          });
        await this.commentsRepository.save(comment);
        return comment;
    }
    
    async getCommentById(id: string): Promise<Comment> {
        const result = await this.commentsRepository.findOne({ where: { id: id } });
        if (!result) {
            throw new NotFoundException(`Comment with ID "${id}" not found`);
        }
        return result;
    }
}
