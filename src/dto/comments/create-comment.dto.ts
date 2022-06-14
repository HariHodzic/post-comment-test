import { IsDate } from 'class-validator';
import { Post } from 'src/entities/post.entity';

export class CreateCommentDto {
  content: string;

  @IsDate()
  dateTime: Date = new Date();

  postId: string;
}
